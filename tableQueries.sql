CREATE DATABASE ISHAR;

CREATE TABLE Ayurveda (
   articleKey varchar(8) primary key,
   itemType text,
   publicationYear int,
   author text,
   title text,
   publication text,
   issn text,
   doi text,
   url text,
   abstract mediumtext,
   datePublished tinytext,
   dateAdded tinytext,
   dateModified tinytext,
   pages tinytext,
   issue tinytext,
   volume tinytext,
   lang tinytext,
   libraryCatalog text,
   linkAttachments text,
   manualTags text,
   autoTags text
);

CREATE TABLE Meditation (
   articleKey varchar(8) primary key,
   itemType text,
   publicationYear int,
   author text,
   title text,
   publication text,
   issn text,
   doi text,
   url text,
   abstract mediumtext,
   datePublished tinytext,
   dateAdded tinytext,
   dateModified tinytext,
   pages tinytext,
   issue tinytext,
   volume tinytext,
   lang tinytext,
   libraryCatalog text,
   linkAttachments text,
   manualTags text,
   autoTags text
);

   LOAD DATA LOCAL INFILE 'C:\\Users\\heart\\Downloads\\Data-Ayurveda-Full.csv' 
   INTO TABLE Ayurveda
   FIELDS TERMINATED BY ',' 
   ENCLOSED BY '"' 
   LINES TERMINATED BY '\r\n'
   IGNORE 1 LINES
   #IGNORE 1 ROWS
   (articleKey, itemType, publicationYear, author, title, publication, issn, doi, url, abstract,
   datePublished, dateAdded, dateModified, pages, issue, volume, lang, libraryCatalog, linkAttachments,
   manualTags, autoTags);
   
   LOAD DATA LOCAL INFILE 'C:\\Users\\heart\\Downloads\\Data-Meditation-Full.csv' 
   INTO TABLE Meditation
   FIELDS TERMINATED BY ',' 
   ENCLOSED BY '"' 
   LINES TERMINATED BY '\r\n'
   IGNORE 1 LINES
   #IGNORE 1 ROWS
   (articleKey, itemType, publicationYear, author, title, publication, issn, doi, url, abstract,
   datePublished, dateAdded, dateModified, pages, issue, volume, lang, libraryCatalog, linkAttachments,
   manualTags, autoTags);
   
   
   Select * From Ayurveda;
   Select * From Meditation;
   

