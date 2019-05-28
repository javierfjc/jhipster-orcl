package com.asg.jhipster.service.mapper;

import com.asg.jhipster.domain.*;
import com.asg.jhipster.service.dto.TipoTerminalDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link TipoTerminal} and its DTO {@link TipoTerminalDTO}.
 */
@Mapper(componentModel = "spring", uses = {TipoEnlaceMapper.class})
public interface TipoTerminalMapper extends EntityMapper<TipoTerminalDTO, TipoTerminal> {

    @Mapping(source = "tipoEnlace.id", target = "tipoEnlaceId")
    TipoTerminalDTO toDto(TipoTerminal tipoTerminal);

    @Mapping(target = "agentes", ignore = true)
    @Mapping(source = "tipoEnlaceId", target = "tipoEnlace")
    TipoTerminal toEntity(TipoTerminalDTO tipoTerminalDTO);

    default TipoTerminal fromId(Long id) {
        if (id == null) {
            return null;
        }
        TipoTerminal tipoTerminal = new TipoTerminal();
        tipoTerminal.setId(id);
        return tipoTerminal;
    }
}
