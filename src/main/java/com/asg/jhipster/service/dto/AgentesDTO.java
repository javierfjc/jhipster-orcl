package com.asg.jhipster.service.dto;
import java.time.LocalDate;
import java.io.Serializable;
import java.util.Objects;
import com.asg.jhipster.domain.enumeration.DominioSiNo;

/**
 * A DTO for the {@link com.asg.jhipster.domain.Agentes} entity.
 */
public class AgentesDTO implements Serializable {

    private Long id;

    private String codigo;

    private String descripcion;

    private LocalDate fechaAlta;

    private String estado;

    private LocalDate fechaEstado;

    private String tpNumero;

    private DominioSiNo tpRegalos;


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

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public LocalDate getFechaAlta() {
        return fechaAlta;
    }

    public void setFechaAlta(LocalDate fechaAlta) {
        this.fechaAlta = fechaAlta;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public LocalDate getFechaEstado() {
        return fechaEstado;
    }

    public void setFechaEstado(LocalDate fechaEstado) {
        this.fechaEstado = fechaEstado;
    }

    public String getTpNumero() {
        return tpNumero;
    }

    public void setTpNumero(String tpNumero) {
        this.tpNumero = tpNumero;
    }

    public DominioSiNo getTpRegalos() {
        return tpRegalos;
    }

    public void setTpRegalos(DominioSiNo tpRegalos) {
        this.tpRegalos = tpRegalos;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        AgentesDTO agentesDTO = (AgentesDTO) o;
        if (agentesDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), agentesDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "AgentesDTO{" +
            "id=" + getId() +
            ", codigo='" + getCodigo() + "'" +
            ", descripcion='" + getDescripcion() + "'" +
            ", fechaAlta='" + getFechaAlta() + "'" +
            ", estado='" + getEstado() + "'" +
            ", fechaEstado='" + getFechaEstado() + "'" +
            ", tpNumero='" + getTpNumero() + "'" +
            ", tpRegalos='" + getTpRegalos() + "'" +
            "}";
    }
}
