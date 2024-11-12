-- USER Be
-- BASE Mozik
-- MDP 123

-- Active: 1725437092242@@127.0.0.1@5432@Mozik@public
create sequence seq_util
increment by 1
start with 1;

create table utilisateur(
    idUtilisateur varchar PRIMARY key,
    prenomUtilisateur varchar(255),
    mailUtilisateur VARCHAR(255),
    mdpUtilisateur VARCHAR(255),
    estSuperUtilisateur BOOLEAN DEFAULT false,
    depuisUtilisateur date DEFAULT current_date
);
insert into utilisateur VALUES(concat('User ',nextval('seq_util')),'Jean','jean@gmail.com','123',true);

create sequence seq_demande
increment by 1
start with 1;

create table demande(
    idDemande VARCHAR PRIMARY key,
    prenomDemande VARCHAR(255),
    mailDemande VARCHAR(255),
    mdpDemande VARCHAR(255),
    dateDemande date DEFAULT current_date
);

insert into demande VALUES(concat('Demande ',nextval('seq_demande')),'Yasuo','yasuo@gmail.com','123');

create sequence seq_evenement
increment by 1
start with 1;

create table evenement(
    idEvenement VARCHAR PRIMARY key,
    idUtilisateur VARCHAR,
    nomEvenement VARCHAR (255),
    dateheureEvenement TIMESTAMP,
    lieuEvenement VARCHAR(255),
    descriEvenement VARCHAR(255),
    imgEvenement VARCHAR(255),
    estValide BOOLEAN,
    etat VARCHAR,
    Foreign Key (idUtilisateur) REFERENCES utilisateur(idUtilisateur)    
);

ALTER TABLE evenement ADD COLUMN etat VARCHAR;

alter table evenement ADD COLUMN estValide BOOLEAN DEFAULT true;

CREATE Table Devis(
    idDevis INTEGER PRIMARY key,
    nomDevis VARCHAR
);

create SEQUENCE seq_billet
INCREMENT by 1
start with 1;

create table billetEvenement(
    idEvenement VARCHAR,
    idBillet VARCHAR PRIMARY key,
    idDevis INTEGER,
    nomBillet VARCHAR(255),
    tarifBillet NUMERIC(9,2),
    nombreBillet INTEGER,
    Foreign Key (idEvenement) REFERENCES evenement(idEvenement),
    Foreign Key (idDevis) REFERENCES devis(iddevis)
);

create SEQUENCE seq_info
INCREMENT by 1
start with 1;

create table infoEvenement(
    idEvenement VARCHAR,
    idInfo VARCHAR PRIMARY KEY,
    numeroInfo VARCHAR,
    Foreign Key (idEvenement) REFERENCES evenement(idEvenement)
);

ALTER TABLE infoEvenement ADD COLUMN nomInfo VARCHAR(255);

SHOW timezone;
ALTER TABLE evenement ALTER COLUMN dateheureevenement TYPE TIMESTAMP WITH TIME ZONE;

CREATE SEQUENCE seq_client
    START WITH 1
    INCREMENT BY 1;

CREATE TABLE clients (
    idclient character varying NOT NULL,
    nomclient character varying(255),
    prenomclient character varying(255),
    mailclient character varying(255),
    mdpclient character varying,
    dateclient date DEFAULT CURRENT_DATE
);

CREATE TABLE public.achat (
    tokenachat character varying NOT NULL,
    idclient character varying,
    idevenement character varying,
    idbillet character varying,
    nombre integer,
    montant numeric(9,2),
    datetransaction timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    estvalide boolean DEFAULT true
);


CREATE VIEW public.achat_summary AS
 SELECT count(*) AS nb_achat,
        CASE
            WHEN (count(
            CASE
                WHEN (achat.datetransaction < (CURRENT_TIMESTAMP - '30 days'::interval)) THEN 1
                ELSE NULL::integer
            END) = NULL::bigint) THEN 0.00
            ELSE COALESCE(round(((((count(*))::numeric - (count(
            CASE
                WHEN (achat.datetransaction < (CURRENT_TIMESTAMP - '30 days'::interval)) THEN 1
                ELSE NULL::integer
            END))::numeric) / (NULLIF(count(
            CASE
                WHEN (achat.datetransaction < (CURRENT_TIMESTAMP - '30 days'::interval)) THEN 1
                ELSE NULL::integer
            END), 0))::numeric) * (100)::numeric), 2), 0.00)
        END AS increase
   FROM public.achat;


CREATE VIEW public.ca_summary AS
 SELECT sum(achat.montant) AS montant,
    sum(
        CASE
            WHEN (achat.datetransaction < (CURRENT_DATE - '30 days'::interval)) THEN achat.montant
            ELSE NULL::numeric
        END) AS ancien_nombre,
    COALESCE(round(
        CASE
            WHEN ((sum(
            CASE
                WHEN (achat.datetransaction >= (CURRENT_DATE - '30 days'::interval)) THEN achat.montant
                ELSE NULL::numeric
            END) = (0)::numeric) OR (sum(
            CASE
                WHEN (achat.datetransaction < (CURRENT_DATE - '30 days'::interval)) THEN achat.montant
                ELSE NULL::numeric
            END) IS NULL)) THEN 0.00
            ELSE ((sum(
            CASE
                WHEN (achat.datetransaction >= (CURRENT_DATE - '30 days'::interval)) THEN achat.montant
                ELSE NULL::numeric
            END) / sum(
            CASE
                WHEN (achat.datetransaction < (CURRENT_DATE - '30 days'::interval)) THEN achat.montant
                ELSE NULL::numeric
            END)) * (100)::numeric)
        END, 2), 0.00) AS augmentation
   FROM public.achat;


CREATE VIEW public.client_summary AS
 SELECT count(*) AS nb_client,
    count(
        CASE
            WHEN (clients.dateclient < (CURRENT_DATE - '30 days'::interval)) THEN 1
            ELSE NULL::integer
        END) AS ancien_nombre,
    (count(*) - count(
        CASE
            WHEN (clients.dateclient < (CURRENT_DATE - '30 days'::interval)) THEN 1
            ELSE NULL::integer
        END)) AS augmentation,
    COALESCE(round(
        CASE
            WHEN ((count(*) = 0) OR (count(
            CASE
                WHEN (clients.dateclient < (CURRENT_DATE - '30 days'::interval)) THEN 1
                ELSE NULL::integer
            END) IS NULL)) THEN 0.00
            ELSE ((((count(*) - count(
            CASE
                WHEN (clients.dateclient < (CURRENT_DATE - '30 days'::interval)) THEN 1
                ELSE NULL::integer
            END)))::numeric / (NULLIF(count(
            CASE
                WHEN (clients.dateclient < (CURRENT_DATE - '30 days'::interval)) THEN 1
                ELSE NULL::integer
            END), 0))::numeric) * (100)::numeric)
        END, 2), 0.00) AS increase
   FROM public.clients;


   CREATE VIEW public.event_summary AS
 SELECT count(*) AS nb_event,
    count(
        CASE
            WHEN (evenement.dateheureevenement < (CURRENT_TIMESTAMP - '30 days'::interval)) THEN 1
            ELSE NULL::integer
        END) AS acien,
    COALESCE(round(
        CASE
            WHEN ((count(*) = 0) OR (count(
            CASE
                WHEN (evenement.dateheureevenement < (CURRENT_TIMESTAMP - '30 days'::interval)) THEN 1
                ELSE NULL::integer
            END) IS NULL)) THEN 0.00
            ELSE ((((count(*))::numeric - (count(
            CASE
                WHEN (evenement.dateheureevenement < (CURRENT_TIMESTAMP - '30 days'::interval)) THEN 1
                ELSE NULL::integer
            END))::numeric) / (NULLIF(count(
            CASE
                WHEN (evenement.dateheureevenement < (CURRENT_TIMESTAMP - '30 days'::interval)) THEN 1
                ELSE NULL::integer
            END), 0))::numeric) * (100)::numeric)
        END, 2), 0.00) AS increase
   FROM public.evenement;

CREATE VIEW public.v_achat AS
 SELECT achat.tokenachat,
    clients.nomclient,
    clients.prenomclient,
    evenement.nomevenement,
    billetevenement.nombillet,
    achat.nombre,
    achat.estvalide
   FROM (((public.achat
     JOIN public.clients ON (((clients.idclient)::text = (achat.idclient)::text)))
     JOIN public.evenement ON (((evenement.idevenement)::text = (achat.idevenement)::text)))
     JOIN public.billetevenement ON (((billetevenement.idbillet)::text = (achat.idbillet)::text)));

CREATE VIEW public.v_billet_achat_event AS
SELECT
    NULL::character varying AS idevenement,
    NULL::character varying AS idbillet,
    NULL::character varying(255) AS nombillet,
    NULL::numeric(9,2) AS tarifbillet,
    NULL::character varying(255) AS nomdevis,
    NULL::integer AS nombrebillet,
    NULL::bigint AS total_achats;


CREATE VIEW public.v_historique_client AS
 SELECT achat.idclient,
    achat.idevenement,
    evenement.nomevenement,
    achat.idbillet,
    billetevenement.nombillet,
    achat.nombre,
    achat.montant,
    devis.nomdevis,
    achat.datetransaction
   FROM (((public.achat
     JOIN public.evenement ON (((evenement.idevenement)::text = (achat.idevenement)::text)))
     JOIN public.billetevenement ON (((billetevenement.idbillet)::text = (achat.idbillet)::text)))
     JOIN public.devis ON ((devis.iddevis = billetevenement.iddevis)));

CREATE VIEW public.v_stat_event AS
 SELECT achat.idevenement,
    sum(achat.montant) AS montant,
    sum(achat.nombre) AS vente
   FROM public.achat
  GROUP BY achat.idevenement;


  CREATE OR REPLACE VIEW public.v_billet_achat_event AS
 SELECT b.idevenement,
    b.idbillet,
    b.nombillet,
    b.tarifbillet,
    devis.nomdevis,
    b.nombrebillet,
    COALESCE(sum(a.nombre), (0)::bigint) AS total_achats
   FROM ((public.billetevenement b
     JOIN public.devis ON ((devis.iddevis = b.iddevis)))
     LEFT JOIN public.achat a ON (((b.idbillet)::text = (a.idbillet)::text)))
  GROUP BY b.idevenement, b.idbillet, b.nombillet, devis.nomdevis;





    





