package com.asg.jhipster.repository;

import com.asg.jhipster.domain.TipoTerminal;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the TipoTerminal entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TipoTerminalRepository extends JpaRepository<TipoTerminal, Long> {

}
