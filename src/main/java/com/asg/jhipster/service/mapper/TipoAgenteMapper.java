package com.asg.jhipster.service.mapper;

import com.asg.jhipster.domain.*;
import com.asg.jhipster.service.dto.TipoAgenteDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link TipoAgente} and its DTO {@link TipoAgenteDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface TipoAgenteMapper extends EntityMapper<TipoAgenteDTO, TipoAgente> {


    @Mapping(target = "agentes", ignore = true)
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
