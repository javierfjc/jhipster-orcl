package com.asg.jhipster.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Almacenes.
 */
@Entity
@Table(name = "almacenes")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Almacenes implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "codigo")
    private String codigo;

    @Column(name = "titulo")
    private String titulo;

    @Column(name = "fecha_alta")
    private LocalDate fechaAlta;

    @Column(name = "estado")
    private String estado;

    @Column(name = "fecha_estado")
    private LocalDate fechaEstado;

    @OneToMany(mappedBy = "almacen")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Agentes> agentes = new HashSet<>();

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

    public Almacenes codigo(String codigo) {
        this.codigo = codigo;
        return this;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public String getTitulo() {
        return titulo;
    }

    public Almacenes titulo(String titulo) {
        this.titulo = titulo;
        return this;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public LocalDate getFechaAlta() {
        return fechaAlta;
    }

    public Almacenes fechaAlta(LocalDate fechaAlta) {
        this.fechaAlta = fechaAlta;
        return this;
    }

    public void setFechaAlta(LocalDate fechaAlta) {
        this.fechaAlta = fechaAlta;
    }

    public String getEstado() {
        return estado;
    }

    public Almacenes estado(String estado) {
        this.estado = estado;
        return this;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public LocalDate getFechaEstado() {
        return fechaEstado;
    }

    public Almacenes fechaEstado(LocalDate fechaEstado) {
        this.fechaEstado = fechaEstado;
        return this;
    }

    public void setFechaEstado(LocalDate fechaEstado) {
        this.fechaEstado = fechaEstado;
    }

    public Set<Agentes> getAgentes() {
        return agentes;
    }

    public Almacenes agentes(Set<Agentes> agentes) {
        this.agentes = agentes;
        return this;
    }

    public Almacenes addAgente(Agentes agentes) {
        this.agentes.add(agentes);
        agentes.setAlmacen(this);
        return this;
    }

    public Almacenes removeAgente(Agentes agentes) {
        this.agentes.remove(agentes);
        agentes.setAlmacen(null);
        return this;
    }

    public void setAgentes(Set<Agentes> agentes) {
        this.agentes = agentes;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Almacenes)) {
            return false;
        }
        return id != null && id.equals(((Almacenes) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Almacenes{" +
            "id=" + getId() +
            ", codigo='" + getCodigo() + "'" +
            ", titulo='" + getTitulo() + "'" +
            ", fechaAlta='" + getFechaAlta() + "'" +
            ", estado='" + getEstado() + "'" +
            ", fechaEstado='" + getFechaEstado() + "'" +
            "}";
    }
}
