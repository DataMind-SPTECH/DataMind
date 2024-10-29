package datamind;

import java.util.ArrayList;
import java.util.List;

public class TratacaoDeDados {
    public List<Feedback_POI> processarDados(List<Feedback_POI> feedbacks) {
        List<Feedback_POI> dadosTratados = new ArrayList<>();

        for (Feedback_POI feedback : feedbacks) {
            String comentario = feedback.getComentario();
            String avaliacao = feedback.getAvaliacao(); // Corrigido para pegar a avaliação correta



            // Condição 1: Verificar se um caractere específico está presente no comentário
            if (comentario.contains("½ï¿")) { // Substitua "½ï¿" pelo caractere que deseja filtrar
                continue; // Não adiciona se o caractere estiver presente
            }

            // Condição 2: Pegar a primeira posição da string de avaliação e transformar em número
            if (!avaliacao.isEmpty()) {
                char firstChar = avaliacao.charAt(0); // Pega o primeiro caractere
                int number = Character.getNumericValue(firstChar); // Converte para número

                if (number >= 0) { // Verifica se é um número válido
                    // Criar um novo objeto Feedback_POI com o comentário e a nota
                    Feedback_POI feedbackTratado = new Feedback_POI(
                            comentario, // Comentário mantido
                            number // Nota obtid
                    );
                    dadosTratados.add(feedbackTratado);
                }
            }
        }
        return dadosTratados;
    }
}
