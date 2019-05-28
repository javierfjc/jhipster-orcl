package com.asg.jhipster.service.mapper;

import com.asg.jhipster.domain.*;
import com.asg.jhipster.service.dto.EmpresasDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Empresas} and its DTO {@link EmpresasDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface EmpresasMapper extends EntityMapper<EmpresasDTO, Empresas> {


    @Mapping(target = "agentes", ignore = true)
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
