package com.asg.jhipster.service.mapper;

import com.asg.jhipster.domain.*;
import com.asg.jhipster.service.dto.AlmacenesDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Almacenes} and its DTO {@link AlmacenesDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface AlmacenesMapper extends EntityMapper<AlmacenesDTO, Almacenes> {


    @Mapping(target = "agentes", ignore = true)
    Almacenes toEntity(AlmacenesDTO almacenesDTO);

    default Almacenes fromId(Long id) {
        if (id == null) {
            return null;
        }
        Almacenes almacenes = new Almacenes();
        almacenes.setId(id);
        return almacenes;
    }
}
