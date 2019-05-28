package com.asg.jhipster.repository;

import com.asg.jhipster.domain.Agentes;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Agentes entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AgentesRepository extends JpaRepository<Agentes, Long> {

}
