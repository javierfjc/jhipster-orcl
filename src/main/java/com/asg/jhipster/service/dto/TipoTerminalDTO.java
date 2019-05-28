package com.asg.jhipster.service.dto;
import java.io.Serializable;
import java.util.Objects;
import com.asg.jhipster.domain.enumeration.DominioSiNo;
import com.asg.jhipster.domain.enumeration.DominioSiNo;
import com.asg.jhipster.domain.enumeration.TipoTerminalTipoImporte;
import com.asg.jhipster.domain.enumeration.TipoTerminalTipoImporte;
import com.asg.jhipster.domain.enumeration.TipoTerminalTipoImporte;

/**
 * A DTO for the {@link com.asg.jhipster.domain.TipoTerminal} entity.
 */
public class TipoTerminalDTO implements Serializable {

    private Long id;

    private String codigo;

    private String titulo;

    private String descripcion;

    private String pathEnvio;

    private String pathRecibir;

    private Integer contador;

    private DominioSiNo controlVisitas;

    private DominioSiNo controlCobros;

    private TipoTerminalTipoImporte tipoImporteDto1;

    private TipoTerminalTipoImporte tipoImporteDto2;

    private TipoTerminalTipoImporte tipoImporteDto3;


    private Long agentesId;

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

    public String getPathEnvio() {
        return pathEnvio;
    }

    public void setPathEnvio(String pathEnvio) {
        this.pathEnvio = pathEnvio;
    }

    public String getPathRecibir() {
        return pathRecibir;
    }

    public void setPathRecibir(String pathRecibir) {
        this.pathRecibir = pathRecibir;
    }

    public Integer getContador() {
        return contador;
    }

    public void setContador(Integer contador) {
        this.contador = contador;
    }

    public DominioSiNo getControlVisitas() {
        return controlVisitas;
    }

    public void setControlVisitas(DominioSiNo controlVisitas) {
        this.controlVisitas = controlVisitas;
    }

    public DominioSiNo getControlCobros() {
        return controlCobros;
    }

    public void setControlCobros(DominioSiNo controlCobros) {
        this.controlCobros = controlCobros;
    }

    public TipoTerminalTipoImporte getTipoImporteDto1() {
        return tipoImporteDto1;
    }

    public void setTipoImporteDto1(TipoTerminalTipoImporte tipoImporteDto1) {
        this.tipoImporteDto1 = tipoImporteDto1;
    }

    public TipoTerminalTipoImporte getTipoImporteDto2() {
        return tipoImporteDto2;
    }

    public void setTipoImporteDto2(TipoTerminalTipoImporte tipoImporteDto2) {
        this.tipoImporteDto2 = tipoImporteDto2;
    }

    public TipoTerminalTipoImporte getTipoImporteDto3() {
        return tipoImporteDto3;
    }

    public void setTipoImporteDto3(TipoTerminalTipoImporte tipoImporteDto3) {
        this.tipoImporteDto3 = tipoImporteDto3;
    }

    public Long getAgentesId() {
        return agentesId;
    }

    public void setAgentesId(Long agentesId) {
        this.agentesId = agentesId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        TipoTerminalDTO tipoTerminalDTO = (TipoTerminalDTO) o;
        if (tipoTerminalDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), tipoTerminalDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TipoTerminalDTO{" +
            "id=" + getId() +
            ", codigo='" + getCodigo() + "'" +
            ", titulo='" + getTitulo() + "'" +
            ", descripcion='" + getDescripcion() + "'" +
            ", pathEnvio='" + getPathEnvio() + "'" +
            ", pathRecibir='" + getPathRecibir() + "'" +
            ", contador=" + getContador() +
            ", controlVisitas='" + getControlVisitas() + "'" +
            ", controlCobros='" + getControlCobros() + "'" +
            ", tipoImporteDto1='" + getTipoImporteDto1() + "'" +
            ", tipoImporteDto2='" + getTipoImporteDto2() + "'" +
            ", tipoImporteDto3='" + getTipoImporteDto3() + "'" +
            ", agentes=" + getAgentesId() +
            "}";
    }
}
