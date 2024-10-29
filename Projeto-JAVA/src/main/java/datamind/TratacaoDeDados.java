package datamind;

import java.util.ArrayList;
import java.util.List;

public class TratacaoDeDados {
    public List<Feedback_POI> processarDados(List<Feedback_POI> feedbacks) {
        System.out.println("\n========== Iniciando o processamento dos dados ==========");
        List<Feedback_POI> dadosTratados = new ArrayList<>();

        for (Feedback_POI feedback : feedbacks) {
            System.out.println("\n---------------------------------------------------------");
            String comentario = feedback.getComentario();
            String avaliacao = feedback.getAvaliacao();
            System.out.println("Processando feedback com comentário: \"" + comentario + "\" e avaliação: \"" + avaliacao + "\"");

            // Condição 1: Verificar se um caractere específico está presente no comentário
            if (comentario.contains("½ï¿")) {
                System.out.println("\nComentário contém caractere específico indesejado, será ignorado.");
                continue;
            }

            // Condição 2: Pegar a primeira posição da string de avaliação e transformar em número
            if (!avaliacao.isEmpty()) {
                char firstChar = avaliacao.charAt(0);
                int number = Character.getNumericValue(firstChar);
                System.out.println("\nPrimeiro caractere da avaliação convertido para número: " + number);

                if (number >= 0) {
                    // Criar um novo objeto Feedback_POI com o comentário e a nota
                    Feedback_POI feedbackTratado = new Feedback_POI(
                            comentario, // Comentário mantido
                            number // Nota obtida
                    );
                    dadosTratados.add(feedbackTratado);
                    System.out.println("\nFeedback tratado adicionado à lista.");
                } else {
                    System.out.println("\nPrimeiro caractere da avaliação não é um número válido.");
                }
            } else {
                System.out.println("\nAvaliação está vazia, ignorando feedback.");
            }
            System.out.println("---------------------------------------------------------\n");
        }
        System.out.println("\n========== Processamento dos dados concluído ==========");
        System.out.println("Total de feedbacks tratados: " + dadosTratados.size());
        return dadosTratados;
    }
}
