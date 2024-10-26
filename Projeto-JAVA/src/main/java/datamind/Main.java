package datamind;

//import org.springframework.jdbc.core.JdbcTemplate;
import java.io.IOException;
import java.util.List;

import datamind.Feedback_POI;
import datamind.GerenciadorFeedbacks;



public class Main {

    public static void main(String[] args) throws IOException {
        Main app = new Main();

        // Função para gerenciar feedbacks
        app.runFeedbackManager();

        // Função para gerenciar conexão e criar tabelas
//        app.setupDatabase();
    }

    private void runFeedbackManager() throws IOException {
        GerenciadorFeedbacks gerenciadorFeedbacks = new GerenciadorFeedbacks();
        List<Feedback_POI> feedbacks = gerenciadorFeedbacks.criar();
        gerenciadorFeedbacks.imprimir(feedbacks);
    }

 /*   private void setupDatabase() {
        // Realizando conexão
        DBConnectionProvider dbConnectionProvider = new DBConnectionProvider();
        JdbcTemplate connection = dbConnectionProvider.getConnection();

        // Criando tabelas no banco de dados
        connection.execute("""
                CREATE TABLE IF NOT EXISTS dataset (
                    idDataset INT PRIMARY KEY AUTO_INCREMENT,
                    url VARCHAR(400),
                    nome VARCHAR(45),
                    descricao VARCHAR(50)
                );
                """);

        connection.execute("""
                CREATE TABLE IF NOT EXISTS empresa (
                    idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
                    nomeEmpresa VARCHAR(45),
                    cnpj CHAR(14),
                    cep CHAR(8),
                    rua VARCHAR(45),
                    bairro VARCHAR(45),
                    complemento VARCHAR(45),
                    cidade VARCHAR(20),
                    estado VARCHAR(20),
                    numero VARCHAR(5),
                    fkDataset INT,
                    fkMatriz INT,
                    FOREIGN KEY (fkDataset) REFERENCES dataset(idDataset),
                    FOREIGN KEY (fkMatriz) REFERENCES empresa(idEmpresa)
                );
                """);

        connection.execute("""
                CREATE TABLE IF NOT EXISTS cargo (
                    idCargo INT PRIMARY KEY AUTO_INCREMENT,
                    cargo VARCHAR(45)
                );
                """);

        connection.execute("""
                CREATE TABLE IF NOT EXISTS funcionario (
                    idFuncionario INT PRIMARY KEY AUTO_INCREMENT,
                    nome VARCHAR(45),
                    email VARCHAR(45),
                    senha VARCHAR(20),
                    telefone CHAR(11),
                    cpf CHAR(11),
                    fkEmpresa INT,
                    fkCargo INT,
                    FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa),
                    FOREIGN KEY (fkCargo) REFERENCES cargo(idCargo)
                );
                """);

        connection.execute("""
                CREATE TABLE IF NOT EXISTS recomendacoesIA (
                    idRecomendacao INT PRIMARY KEY AUTO_INCREMENT,
                    descricao VARCHAR(500),
                    dtCriacao DATE
                );
                """);

        connection.execute("""
                CREATE TABLE IF NOT EXISTS categoria (
                    idCategoria INT PRIMARY KEY AUTO_INCREMENT,
                    descricao VARCHAR(45),
                    fkRecomendacao INT,
                    FOREIGN KEY (fkRecomendacao) REFERENCES recomendacoesIA(idRecomendacao)
                );
                """);

        connection.execute("""
                CREATE TABLE IF NOT EXISTS feedback (
                    idFeedback INT PRIMARY KEY AUTO_INCREMENT,
                    descricao VARCHAR(1000),
                    rating INT,
                    fkEmpresa INT,
                    fkCategoria INT,
                    FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa),
                    FOREIGN KEY (fkCategoria) REFERENCES categoria(idCategoria)
                );
                """);

        // Inserindo cargo de exemplo
        connection.update("INSERT IGNORE INTO cargo (idCargo, cargo) VALUES (?, ?);", 1, "Responsável Legal");

        // Listando tabelas
        List<String> tabelas = connection.queryForList("SHOW TABLES", String.class);
        System.out.println("Tabelas no banco de dados:");
        tabelas.forEach(System.out::println);
    }*/
}
