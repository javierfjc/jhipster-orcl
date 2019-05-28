package com.asg.jhipster.service.mapper;

import com.asg.jhipster.domain.*;
import com.asg.jhipster.service.dto.TipoAreaDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link TipoArea} and its DTO {@link TipoAreaDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface TipoAreaMapper extends EntityMapper<TipoAreaDTO, TipoArea> {


    @Mapping(target = "agentes", ignore = true)
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
