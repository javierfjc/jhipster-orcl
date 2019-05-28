package com.asg.jhipster.repository;

import com.asg.jhipster.domain.Almacenes;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Almacenes entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AlmacenesRepository extends JpaRepository<Almacenes, Long> {

}
