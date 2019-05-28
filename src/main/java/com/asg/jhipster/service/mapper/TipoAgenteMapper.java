package com.asg.jhipster.service.mapper;

import com.asg.jhipster.domain.*;
import com.asg.jhipster.service.dto.TipoAgenteDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link TipoAgente} and its DTO {@link TipoAgenteDTO}.
 */
@Mapper(componentModel = "spring", uses = {AgentesMapper.class})
public interface TipoAgenteMapper extends EntityMapper<TipoAgenteDTO, TipoAgente> {

    @Mapping(source = "agentes.id", target = "agentesId")
    TipoAgenteDTO toDto(TipoAgente tipoAgente);

    @Mapping(source = "agentesId", target = "agentes")
    TipoAgente toEntity(TipoAgenteDTO tipoAgenteDTO);

    default TipoAgente fromId(Long id) {
        if (id == null) {
            return null;
        }
        TipoAgente tipoAgente = new TipoAgente();
        tipoAgente.setId(id);
        return tipoAgente;
    }
}
