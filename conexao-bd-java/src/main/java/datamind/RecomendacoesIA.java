package datamind;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class RecomendacoesIA {

    private Integer idRecomendacao;
    private String descricao;
    private Date dtCriacao;
    private List<Categoria> categorias = new ArrayList<>();

    public RecomendacoesIA() {
    }

    public RecomendacoesIA(Integer idRecomendacao, String descricao, Date dtCriacao, Categoria categorias) {
        this.idRecomendacao = idRecomendacao;
        this.descricao = descricao;
        this.dtCriacao = dtCriacao;
        this.categorias.add(categorias);
    }

    public Integer getIdRecomendacao() {
        return idRecomendacao;
    }

    public void setIdRecomendacao(Integer idRecomendacao) {
        this.idRecomendacao = idRecomendacao;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Date getDtCriacao() {
        return dtCriacao;
    }

    public void setDtCriacao(Date dtCriacao) {
        this.dtCriacao = dtCriacao;
    }

    public List<Categoria> getCategorias() {
        return categorias;
    }

    public void setCategorias(List<Categoria> categorias) {
        this.categorias = categorias;
    }
}