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
    Foreign Key (idUtilisateur) REFERENCES utilisateur(idUtilisateur)    
);

alter table evenement ADD COLUMN estValide BOOLEAN DEFAULT true;

create SEQUENCE seq_billet
INCREMENT by 1
start with 1;

create table billetEvenement(
    idEvenement VARCHAR,
    idBillet VARCHAR PRIMARY key,
    nomBillet VARCHAR(255),
    tarifBillet NUMERIC(9,2),
    nombreBillet INTEGER,
    Foreign Key (idEvenement) REFERENCES evenement(idEvenement)
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



