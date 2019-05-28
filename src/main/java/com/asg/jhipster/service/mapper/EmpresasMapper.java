package com.asg.jhipster.service.mapper;

import com.asg.jhipster.domain.*;
import com.asg.jhipster.service.dto.EmpresasDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Empresas} and its DTO {@link EmpresasDTO}.
 */
@Mapper(componentModel = "spring", uses = {AgentesMapper.class})
public interface EmpresasMapper extends EntityMapper<EmpresasDTO, Empresas> {

    @Mapping(source = "agentes.id", target = "agentesId")
    EmpresasDTO toDto(Empresas empresas);

    @Mapping(source = "agentesId", target = "agentes")
    Empresas toEntity(EmpresasDTO empresasDTO);

    default Empresas fromId(Long id) {
        if (id == null) {
            return null;
        }
        Empresas empresas = new Empresas();
        empresas.setId(id);
        return empresas;
    }
}
