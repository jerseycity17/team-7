CREATE DATABASE ISHAR;


#Creating table for sample category Ayurveda and Meditation
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

#Populating data tables using LoadData
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
   
   
#Select * From Ayurveda;
#Select * From Meditation;

#Creating a new table as the union of previous two table
create table AyurMedi as  
Select * From Ayurveda 
UNION ALL
select * From Meditation;

#Fulltext index requires table engines to be set to MYISAM
SHOW TABLE STATUS;
ALTER TABLE Meditation ENGINE = MYISAM;
ALTER TABLE Ayurveda ENGINE = MYISAM;
ALTER TABLE AyurMedi ENGINE = MYISAM;


#Creating fulltext index for every table
CREATE FULLTEXT INDEX search
ON Meditation(title, author, abstract, manualTags, autoTags);
   
CREATE FULLTEXT INDEX search
ON Ayurveda(title, author, abstract, manualTags, autoTags);
   
CREATE FULLTEXT INDEX search
ON AyurMedi(title, author, abstract, manualTags, autoTags);
   

#Testing the full text search
Select * From AyurMedi
WHERE MATCH(title, author, abstract, manualTags, autoTags)
AGAINST('back pain' IN NATURAL LANGUAGE MODE);
   
Select * From Meditation
WHERE MATCH(title, author, abstract, manualTags, autoTags)
AGAINST('back pain' IN NATURAL LANGUAGE MODE);
   
Select * From Ayurveda
WHERE MATCH(title, author, abstract, manualTags, autoTags)
AGAINST('back pain' IN NATURAL LANGUAGE MODE);
