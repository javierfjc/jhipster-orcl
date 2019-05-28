package com.asg.jhipster.repository;

import com.asg.jhipster.domain.TipoEnlace;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the TipoEnlace entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TipoEnlaceRepository extends JpaRepository<TipoEnlace, Long> {

}
