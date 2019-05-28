package com.asg.jhipster.service.mapper;

import com.asg.jhipster.domain.*;
import com.asg.jhipster.service.dto.TipoAreaDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link TipoArea} and its DTO {@link TipoAreaDTO}.
 */
@Mapper(componentModel = "spring", uses = {AgentesMapper.class})
public interface TipoAreaMapper extends EntityMapper<TipoAreaDTO, TipoArea> {

    @Mapping(source = "agentes.id", target = "agentesId")
    TipoAreaDTO toDto(TipoArea tipoArea);

    @Mapping(source = "agentesId", target = "agentes")
    TipoArea toEntity(TipoAreaDTO tipoAreaDTO);

    default TipoArea fromId(Long id) {
        if (id == null) {
            return null;
        }
        TipoArea tipoArea = new TipoArea();
        tipoArea.setId(id);
        return tipoArea;
    }
}
