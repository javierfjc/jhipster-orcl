package com.asg.jhipster.service.dto;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.asg.jhipster.domain.TipoEnlace} entity.
 */
public class TipoEnlaceDTO implements Serializable {

    private Long id;

    private String codigo;

    private String titulo;

    private String descripcion;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        TipoEnlaceDTO tipoEnlaceDTO = (TipoEnlaceDTO) o;
        if (tipoEnlaceDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), tipoEnlaceDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TipoEnlaceDTO{" +
            "id=" + getId() +
            ", codigo='" + getCodigo() + "'" +
            ", titulo='" + getTitulo() + "'" +
            ", descripcion='" + getDescripcion() + "'" +
            "}";
    }
}
