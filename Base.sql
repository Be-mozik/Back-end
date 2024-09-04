-- USER Be
-- BASE Mozik
-- MDP 123

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




