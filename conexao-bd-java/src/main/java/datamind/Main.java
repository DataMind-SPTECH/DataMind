package datamind;

import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;

public class Main {

    public static void main(String[] args) {

        //realizando conexão
        DBConnectionProvider dbConnectionProvider = new DBConnectionProvider();
        JdbcTemplate connection = dbConnectionProvider.getConnection();

        // Criando Tabela dataset
        connection.execute("""
                CREATE TABLE IF NOT EXISTS dataset (
                    idDataset INT PRIMARY KEY AUTO_INCREMENT,
                    url VARCHAR(400),
                    nome VARCHAR(45),
                    descricao VARCHAR(50)
                );
                """);

        //Criando tabela empresa
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
                    FOREIGN KEY (fkDataset) REFERENCES dataset(iddataset),
                    FOREIGN KEY (fkMatriz) REFERENCES empresa(idEmpresa)
                );
                """);

        //Criando tabela Cargo
        connection.execute("""
                CREATE TABLE IF NOT EXISTS cargo (
                    idCargo INT PRIMARY KEY AUTO_INCREMENT,
                    cargo VARCHAR(45)
                );
                """);

        //Criando tabela Funcionario
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
                );""");

        //Criando tabela recomendacoesIA
        connection.execute("""
                CREATE TABLE IF NOT EXISTS recomendacoesIA (
                    idRecomendacao INT PRIMARY KEY AUTO_INCREMENT,
                    descricao VARCHAR(500),
                    dtCriacao DATE
                );""");

        //Criando tabela categoria
        connection.execute("""
                CREATE TABLE IF NOT EXISTS categoria (
                    idCategoria INT PRIMARY KEY AUTO_INCREMENT,
                    descricao VARCHAR(45),
                    fkRecomendacao INT,
                    FOREIGN KEY (fkRecomendacao) REFERENCES recomendacoesIA(idRecomendacao)
                );""");

        //Criando tabela feedback
        connection.execute("""
                CREATE TABLE IF NOT EXISTS feedback (
                    idFeedback INT PRIMARY KEY AUTO_INCREMENT,
                    descricao VARCHAR(1000),
                    rating INT,
                    fkEmpresa INT,
                    fkCategoria INT,
                    FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa),
                    FOREIGN KEY (fkCategoria) REFERENCES categoria(idCategoria)
                );""");

        connection.update("INSERT IGNORE INTO cargo (idCargo, cargo) VALUES (?, ?);", 1, "Responsável Legal");

        // Inserindo alguns filmes
        //connection.update("INSERT INTO filme (nome, ano, genero, diretor) VALUES (?, ?, ?, ?)",
        //      "Matrix", 1999, "Ficção Científica", "Lana Wachowski, Lilly Wachowski");

        // Listando todos os filmes
        //List<Filme> filmesDoBanco = connection.query("SELECT * FROM filme", new BeanPropertyRowMapper<>(Filme.class));
        //System.out.println("Filmes no banco de dados:");
        //for (Filme filme : filmesDoBanco) {
        //    System.out.println(filme);
        //}
        List<String> tabelas = connection.queryForList("SHOW TABLES", String.class);
        System.out.println("Tabelas no banco de dados:");
        for (String tabela : tabelas) {
            System.out.println(tabela);
        }

        // Inserindo um novo filme a partir de um objeto
        //Filme novoFilme = new Filme(null, "Vingadores: Ultimato", 2019, "Ação", "Anthony Russo, Joe Russo");
        //connection.update("INSERT INTO filme (nome, ano, genero, diretor) VALUES (?, ?, ?, ?)",
        //        novoFilme.getNome(), novoFilme.getAno(), novoFilme.getGenero(), novoFilme.getDiretor());

        // Atualizando um filme
        //connection.update("UPDATE filme SET nome = ?, ano = ?, genero = ?, diretor = ? WHERE id = ?",
        //        "Shrek", 2001, "Animação", "Andrew Adamson, Vicky Jenson", 5);

        // Deletando um filme
        //connection.update("DELETE FROM filme WHERE id = ?", 5);

        // Busca personalizada
        //System.out.println("\nFilmes de drama no banco de dados:");
        //filmesDoBanco = connection.query("SELECT * FROM filme WHERE genero = ?", new BeanPropertyRowMapper<>(Filme.class), "Drama");
        //for (Filme filme : filmesDoBanco) {
        //    System.out.println(filme);
        //}

        // Buscar um filme pelo ID
        //Filme filmeEncontrado = connection.queryForObject("SELECT * FROM filme WHERE id = ?", new BeanPropertyRowMapper<>(Filme.class), 1);
        //System.out.println("\nFilme com ID 1: " + filmeEncontrado);
        // Obs: se sua query retornar nenhum ou mais de um item, ao executar, uma exceção será lançada.
    }
}