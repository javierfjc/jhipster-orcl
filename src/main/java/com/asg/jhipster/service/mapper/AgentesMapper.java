package com.asg.jhipster.service.mapper;

import com.asg.jhipster.domain.*;
import com.asg.jhipster.service.dto.AgentesDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Agentes} and its DTO {@link AgentesDTO}.
 */
@Mapper(componentModel = "spring", uses = {TipoTerminalMapper.class, TipoAreaMapper.class, TipoAgenteMapper.class, EmpresasMapper.class, AlmacenesMapper.class})
public interface AgentesMapper extends EntityMapper<AgentesDTO, Agentes> {

    @Mapping(source = "tipoTerminal.id", target = "tipoTerminalId")
    @Mapping(source = "tipoArea.id", target = "tipoAreaId")
    @Mapping(source = "tipoAgente.id", target = "tipoAgenteId")
    @Mapping(source = "empresa.id", target = "empresaId")
    @Mapping(source = "almacen.id", target = "almacenId")
    AgentesDTO toDto(Agentes agentes);

    @Mapping(source = "tipoTerminalId", target = "tipoTerminal")
    @Mapping(source = "tipoAreaId", target = "tipoArea")
    @Mapping(source = "tipoAgenteId", target = "tipoAgente")
    @Mapping(source = "empresaId", target = "empresa")
    @Mapping(source = "almacenId", target = "almacen")
    Agentes toEntity(AgentesDTO agentesDTO);

    default Agentes fromId(Long id) {
        if (id == null) {
            return null;
        }
        Agentes agentes = new Agentes();
        agentes.setId(id);
        return agentes;
    }
}
