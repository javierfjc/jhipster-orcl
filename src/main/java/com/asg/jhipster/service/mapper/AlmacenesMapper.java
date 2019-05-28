package com.asg.jhipster.service.mapper;

import com.asg.jhipster.domain.*;
import com.asg.jhipster.service.dto.AlmacenesDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Almacenes} and its DTO {@link AlmacenesDTO}.
 */
@Mapper(componentModel = "spring", uses = {AgentesMapper.class})
public interface AlmacenesMapper extends EntityMapper<AlmacenesDTO, Almacenes> {

    @Mapping(source = "agentes.id", target = "agentesId")
    AlmacenesDTO toDto(Almacenes almacenes);

    @Mapping(source = "agentesId", target = "agentes")
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
