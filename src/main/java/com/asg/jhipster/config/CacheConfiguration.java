package com.asg.jhipster.config;

import java.time.Duration;

import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;

import org.hibernate.cache.jcache.ConfigSettings;
import io.github.jhipster.config.JHipsterProperties;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.boot.autoconfigure.orm.jpa.HibernatePropertiesCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                .build());
    }

    @Bean
    public HibernatePropertiesCustomizer hibernatePropertiesCustomizer(javax.cache.CacheManager cacheManager) {
        return hibernateProperties -> hibernateProperties.put(ConfigSettings.CACHE_MANAGER, cacheManager);
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            createCache(cm, com.asg.jhipster.repository.UserRepository.USERS_BY_LOGIN_CACHE);
            createCache(cm, com.asg.jhipster.repository.UserRepository.USERS_BY_EMAIL_CACHE);
            createCache(cm, com.asg.jhipster.domain.User.class.getName());
            createCache(cm, com.asg.jhipster.domain.Authority.class.getName());
            createCache(cm, com.asg.jhipster.domain.User.class.getName() + ".authorities");
            createCache(cm, com.asg.jhipster.domain.TipoAgente.class.getName());
            createCache(cm, com.asg.jhipster.domain.TipoArea.class.getName());
            createCache(cm, com.asg.jhipster.domain.TipoEnlace.class.getName());
            createCache(cm, com.asg.jhipster.domain.TipoTerminal.class.getName());
            createCache(cm, com.asg.jhipster.domain.TipoTerminal.class.getName() + ".tipoEnlaces");
            createCache(cm, com.asg.jhipster.domain.Almacenes.class.getName());
            createCache(cm, com.asg.jhipster.domain.Empresas.class.getName());
            createCache(cm, com.asg.jhipster.domain.Agentes.class.getName());
            createCache(cm, com.asg.jhipster.domain.Agentes.class.getName() + ".tipoTerminals");
            createCache(cm, com.asg.jhipster.domain.Agentes.class.getName() + ".tipoAreas");
            createCache(cm, com.asg.jhipster.domain.Agentes.class.getName() + ".tipoAgentes");
            createCache(cm, com.asg.jhipster.domain.Agentes.class.getName() + ".empresas");
            createCache(cm, com.asg.jhipster.domain.Agentes.class.getName() + ".almacens");
            // jhipster-needle-ehcache-add-entry
        };
    }

    private void createCache(javax.cache.CacheManager cm, String cacheName) {
        javax.cache.Cache<Object, Object> cache = cm.getCache(cacheName);
        if (cache != null) {
            cm.destroyCache(cacheName);
        }
        cm.createCache(cacheName, jcacheConfiguration);
    }
}
