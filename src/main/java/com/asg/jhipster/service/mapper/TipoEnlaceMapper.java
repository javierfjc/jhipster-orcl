package com.asg.jhipster.service.mapper;

import com.asg.jhipster.domain.*;
import com.asg.jhipster.service.dto.TipoEnlaceDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link TipoEnlace} and its DTO {@link TipoEnlaceDTO}.
 */
@Mapper(componentModel = "spring", uses = {TipoTerminalMapper.class})
public interface TipoEnlaceMapper extends EntityMapper<TipoEnlaceDTO, TipoEnlace> {

    @Mapping(source = "tipoTerminal.id", target = "tipoTerminalId")
    TipoEnlaceDTO toDto(TipoEnlace tipoEnlace);

    @Mapping(source = "tipoTerminalId", target = "tipoTerminal")
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
