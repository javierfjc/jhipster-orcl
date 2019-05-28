package com.asg.jhipster.service.mapper;

import com.asg.jhipster.domain.*;
import com.asg.jhipster.service.dto.TipoTerminalDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link TipoTerminal} and its DTO {@link TipoTerminalDTO}.
 */
@Mapper(componentModel = "spring", uses = {AgentesMapper.class})
public interface TipoTerminalMapper extends EntityMapper<TipoTerminalDTO, TipoTerminal> {

    @Mapping(source = "agentes.id", target = "agentesId")
    TipoTerminalDTO toDto(TipoTerminal tipoTerminal);

    @Mapping(target = "tipoEnlaces", ignore = true)
    @Mapping(source = "agentesId", target = "agentes")
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
