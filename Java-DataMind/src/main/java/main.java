import java.io.IOException;
import java.util.List;

public class main {
    public static void main(String[] args) throws IOException {

        GerenciadorFeedbacks gerenciadorFeedbacks = new GerenciadorFeedbacks();

        List<Feedback> feedbacks = gerenciadorFeedbacks.criar();

        gerenciadorFeedbacks.imprimir(feedbacks);
    }
}
