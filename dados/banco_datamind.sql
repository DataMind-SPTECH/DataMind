
CREATE DATABASE datamind;
USE datamind;

CREATE TABLE cargo (
  idCargo INT PRIMARY KEY AUTO_INCREMENT,
  nomeCargo VARCHAR(45)
);

CREATE TABLE dataset (
  idDataset INT PRIMARY KEY AUTO_INCREMENT,
  url VARCHAR(1000),
  nome VARCHAR(45), 
  descricao VARCHAR(45)
);

CREATE TABLE empresa (
  idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
  nomeEmpresa VARCHAR(45),
  fkUrl INT, 
	FOREIGN KEY(fkUrl)
    REFERENCES dataset(idDataset)
);

CREATE TABLE filial (
  idFilial INT PRIMARY KEY AUTO_INCREMENT,
  fkEmpresa INT, 
	FOREIGN KEY (fkEmpresa) 
		REFERENCES empresa(idEmpresa),
  cnpj CHAR(11),
  cep CHAR(8),
  numero VARCHAR(10)
);

CREATE TABLE funcionario (
  idFuncionario INT,
  idFkFilial INT,
	FOREIGN KEY (idFkFilial) 
		REFERENCES filial(idFilial),
	PRIMARY KEY(idFuncionario, idFkFilial),
  nome VARCHAR(45),
  email VARCHAR(45) UNIQUE,
  senha VARCHAR(45),
  cpf VARCHAR(45),
  fkGestor INT,
	FOREIGN KEY (fkGestor) 
		REFERENCES funcionario(idFuncionario),
  fkCargo INT,
	FOREIGN KEY (fkCargo) 
		REFERENCES cargo(idCargo)
);



