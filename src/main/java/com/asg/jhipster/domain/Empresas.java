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
 * A Empresas.
 */
@Entity
@Table(name = "empresas")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Empresas implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "codigo")
    private String codigo;

    @Column(name = "descripcion")
    private String descripcion;

    @Column(name = "titulo")
    private String titulo;

    @Column(name = "cif")
    private String cif;

    @Column(name = "fecha_alta")
    private LocalDate fechaAlta;

    @Column(name = "estado")
    private String estado;

    @Column(name = "fecha_estado")
    private LocalDate fechaEstado;

    @Column(name = "exclusiva")
    private String exclusiva;

    @OneToMany(mappedBy = "empresa")
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

    public Empresas codigo(String codigo) {
        this.codigo = codigo;
        return this;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public Empresas descripcion(String descripcion) {
        this.descripcion = descripcion;
        return this;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getTitulo() {
        return titulo;
    }

    public Empresas titulo(String titulo) {
        this.titulo = titulo;
        return this;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getCif() {
        return cif;
    }

    public Empresas cif(String cif) {
        this.cif = cif;
        return this;
    }

    public void setCif(String cif) {
        this.cif = cif;
    }

    public LocalDate getFechaAlta() {
        return fechaAlta;
    }

    public Empresas fechaAlta(LocalDate fechaAlta) {
        this.fechaAlta = fechaAlta;
        return this;
    }

    public void setFechaAlta(LocalDate fechaAlta) {
        this.fechaAlta = fechaAlta;
    }

    public String getEstado() {
        return estado;
    }

    public Empresas estado(String estado) {
        this.estado = estado;
        return this;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public LocalDate getFechaEstado() {
        return fechaEstado;
    }

    public Empresas fechaEstado(LocalDate fechaEstado) {
        this.fechaEstado = fechaEstado;
        return this;
    }

    public void setFechaEstado(LocalDate fechaEstado) {
        this.fechaEstado = fechaEstado;
    }

    public String getExclusiva() {
        return exclusiva;
    }

    public Empresas exclusiva(String exclusiva) {
        this.exclusiva = exclusiva;
        return this;
    }

    public void setExclusiva(String exclusiva) {
        this.exclusiva = exclusiva;
    }

    public Set<Agentes> getAgentes() {
        return agentes;
    }

    public Empresas agentes(Set<Agentes> agentes) {
        this.agentes = agentes;
        return this;
    }

    public Empresas addAgente(Agentes agentes) {
        this.agentes.add(agentes);
        agentes.setEmpresa(this);
        return this;
    }

    public Empresas removeAgente(Agentes agentes) {
        this.agentes.remove(agentes);
        agentes.setEmpresa(null);
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
        if (!(o instanceof Empresas)) {
            return false;
        }
        return id != null && id.equals(((Empresas) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Empresas{" +
            "id=" + getId() +
            ", codigo='" + getCodigo() + "'" +
            ", descripcion='" + getDescripcion() + "'" +
            ", titulo='" + getTitulo() + "'" +
            ", cif='" + getCif() + "'" +
            ", fechaAlta='" + getFechaAlta() + "'" +
            ", estado='" + getEstado() + "'" +
            ", fechaEstado='" + getFechaEstado() + "'" +
            ", exclusiva='" + getExclusiva() + "'" +
            "}";
    }
}
