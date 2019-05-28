package com.asg.jhipster.repository;

import com.asg.jhipster.domain.TipoAgente;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the TipoAgente entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TipoAgenteRepository extends JpaRepository<TipoAgente, Long> {

}
