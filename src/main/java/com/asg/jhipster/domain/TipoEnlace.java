package com.asg.jhipster.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A TipoEnlace.
 */
@Entity
@Table(name = "tipo_enlace")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class TipoEnlace implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "codigo")
    private String codigo;

    @Column(name = "titulo")
    private String titulo;

    @Column(name = "descripcion")
    private String descripcion;

    @OneToMany(mappedBy = "tipoEnlace")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<TipoTerminal> tipoTerminals = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCodigo() {
        return codigo;
    }

    public TipoEnlace codigo(String codigo) {
        this.codigo = codigo;
        return this;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public String getTitulo() {
        return titulo;
    }

    public TipoEnlace titulo(String titulo) {
        this.titulo = titulo;
        return this;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public TipoEnlace descripcion(String descripcion) {
        this.descripcion = descripcion;
        return this;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Set<TipoTerminal> getTipoTerminals() {
        return tipoTerminals;
    }

    public TipoEnlace tipoTerminals(Set<TipoTerminal> tipoTerminals) {
        this.tipoTerminals = tipoTerminals;
        return this;
    }

    public TipoEnlace addTipoTerminal(TipoTerminal tipoTerminal) {
        this.tipoTerminals.add(tipoTerminal);
        tipoTerminal.setTipoEnlace(this);
        return this;
    }

    public TipoEnlace removeTipoTerminal(TipoTerminal tipoTerminal) {
        this.tipoTerminals.remove(tipoTerminal);
        tipoTerminal.setTipoEnlace(null);
        return this;
    }

    public void setTipoTerminals(Set<TipoTerminal> tipoTerminals) {
        this.tipoTerminals = tipoTerminals;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TipoEnlace)) {
            return false;
        }
        return id != null && id.equals(((TipoEnlace) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "TipoEnlace{" +
            "id=" + getId() +
            ", codigo='" + getCodigo() + "'" +
            ", titulo='" + getTitulo() + "'" +
            ", descripcion='" + getDescripcion() + "'" +
            "}";
    }
}
