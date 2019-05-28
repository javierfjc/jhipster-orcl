package com.asg.jhipster.service.mapper;

import com.asg.jhipster.domain.*;
import com.asg.jhipster.service.dto.AgentesDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Agentes} and its DTO {@link AgentesDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface AgentesMapper extends EntityMapper<AgentesDTO, Agentes> {


    @Mapping(target = "tipoTerminals", ignore = true)
    @Mapping(target = "tipoAreas", ignore = true)
    @Mapping(target = "tipoAgentes", ignore = true)
    @Mapping(target = "empresas", ignore = true)
    @Mapping(target = "almacens", ignore = true)
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
