package com.asg.jhipster.repository;

import com.asg.jhipster.domain.Empresas;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Empresas entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EmpresasRepository extends JpaRepository<Empresas, Long> {

}
