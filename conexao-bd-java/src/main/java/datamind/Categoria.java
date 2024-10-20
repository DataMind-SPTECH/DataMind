package datamind;

import java.util.ArrayList;
import java.util.List;

public class Categoria {

    private Integer idCategoria;
    private String descricao;
    private List<Feedback> feedbacks = new ArrayList<>();
    private RecomendacoesIA recomendacoesIA;

    public Categoria() {
    }

    public Categoria(Integer idCategoria, String descricao, Feedback feedbacks, RecomendacoesIA recomendacoesIA) {
        this.idCategoria = idCategoria;
        this.descricao = descricao;
        this.feedbacks.add(feedbacks);

    }

    public Integer getIdCategoria() {
        return idCategoria;
    }

    public void setIdCategoria(Integer idCategoria) {
        this.idCategoria = idCategoria;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public List<Feedback> getFeedbacks() {
        return feedbacks;
    }

    public void setFeedbacks(List<Feedback> feedbacks) {
        this.feedbacks = feedbacks;
    }
}
