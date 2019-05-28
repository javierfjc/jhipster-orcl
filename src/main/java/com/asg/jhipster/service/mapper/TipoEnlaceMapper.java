package com.asg.jhipster.service.mapper;

import com.asg.jhipster.domain.*;
import com.asg.jhipster.service.dto.TipoEnlaceDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link TipoEnlace} and its DTO {@link TipoEnlaceDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface TipoEnlaceMapper extends EntityMapper<TipoEnlaceDTO, TipoEnlace> {


    @Mapping(target = "tipoTerminals", ignore = true)
    TipoEnlace toEntity(TipoEnlaceDTO tipoEnlaceDTO);

    default TipoEnlace fromId(Long id) {
        if (id == null) {
            return null;
        }
        TipoEnlace tipoEnlace = new TipoEnlace();
        tipoEnlace.setId(id);
        return tipoEnlace;
    }
}
