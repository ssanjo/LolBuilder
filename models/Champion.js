class Champion {

  // todo : mirar la api de famdom con los objetos https://leagueoflegends.fandom.com/wiki/Module:ItemData/data
  // todo : añadir la api de famdom con las habilidades https://leagueoflegends.fandom.com/wiki/Module:SpellData/data

  // ["Aatrox"] = {
  //   ["id"]         = 266,
  //   ["apiname"]    = "Aatrox",
  //   ["title"]      = "the Darkin Blade",
  //   ["difficulty"] = 2,
  //   ["herotype"]   = "Fighter",
  //   ["alttype"]    = "Tank",
  //   ["resource"]   = "Blood Well",
  //   ["stats"] = {
  //     ["hp_base"]  = 650,
  //     ["hp_lvl"]   = 114,
  //     ["mp_base"]  = 0,
  //     ["mp_lvl"]   = 0,
  //     ["arm_base"] = 38,
  //     ["arm_lvl"]  = 4.8,
  //     ["mr_base"]  = 32,
  //     ["mr_lvl"]   = 2.05,
  //     ["hp5_base"] = 3,
  //     ["hp5_lvl"]  = 0.5,
  //     ["mp5_base"] = 0,
  //     ["mp5_lvl"]  = 0,
  //     ["dam_base"] = 60,
  //     ["dam_lvl"]  = 5,
  //     ["as_base"]  = 0.651,
  //     ["as_lvl"]   = 2.5,
  //     ["range"]    = 175,
  //     ["ms"]       = 345,
  //     ["acquisition_radius"] = 475,
  //     ["selection_radius"] = 135,
  //     ["pathing_radius"] = 35,
  //     ["as_ratio"] = 0.651000022888183,
  //     ["attack_cast_time"] = 0.300000011920928,
  //     ["attack_total_time"] = 1.51999998092651,
  //     ["aram"] = {
  //       ["dmg_dealt"] = 1.05,
  //       ["dmg_taken"] = 1,
  //     },
  //     ["urf"] = {
  //       ["dmg_dealt"] = 1.15,
  //       ["dmg_taken"] = 0.7,
  //     },
  //   },
  //   ["rangetype"]   = "Melee",
  //   ["date"]        = "2013-06-13",
  //   ["patch"]       = "V3.8",
  //   ["changes"]     = "V14.14",
  //   ["role"]        = {"Juggernaut"},
  //   ["client_positions"]   = {"Top"},
  //   ["external_positions"] = {"Top"},
  //   ["damage"]      = 3,
  //   ["toughness"]   = 3,
  //   ["control"]     = 2,
  //   ["mobility"]    = 2,
  //   ["utility"]     = 2,
  //   ["style"]       = 20,
  //   ["adaptivetype"]= "Physical",
  //   ["be"]          = 4800,
  //   ["rp"]          = 880,
  //   ["skill_i"]     = {[1] = "Deathbringer Stance"},
  //   ["skill_q"]     = {[1] = "The Darkin Blade"},
  //   ["skill_w"]     = {[1] = "Infernal Chains"},
  //   ["skill_e"]     = {[1] = "Umbral Dash"},
  //   ["skill_r"]     = {[1] = "World Ender"},
  //   ["skills"]      = {
  //       [1] = "Deathbringer Stance",
  //       [2] = "The Darkin Blade",
  //       [3] = "Infernal Chains",
  //       [4] = "Umbral Dash",
  //       [5] = "World Ender"},
  // },
  constructor(data) {
    this.id = data.id;
    this.apiname = data.apiname;
    this.title = data.title;
    this.difficulty = data.difficulty;
    this.herotype = data.herotype;
    this.alttype = data.alttype;
    this.resource = data.resource;
    this.stats = data.stats;
    this.rangetype = data.rangetype;
    this.date = data.date;
    this.patch = data.patch;
    this.changes = data.changes;
    this.role = data.role;
    this.clientPositions = data.client_positions;
    this.externalPositions = data.external_positions;
    this.damage = data.damage;
    this.toughness = data.toughness;
    this.control = data.control;
    this.mobility = data.mobility;
    this.utility = data.utility;
    this.style = data.style;
    this.adaptivetype = data.adaptivetype;
    this.be = data.be;
    this.rp = data.rp;
    this.skillI = data.skill_i;
    this.skillQ = data.skill_q;
    this.skillW = data.skill_w;
    this.skillE = data.skill_e;
    this.skillR = data.skill_r;
    this.skills = data.skills;
    this.lvl = 1; 
    this.items = {};
  }

  /* 
    como funciona el resto de stats
    totalStat = baseStat + (growthStat * (lvl - 1) * (0.7025+0.0175*(lvl-1) ) ) )
    context: https://leagueoflegends.fandom.com/wiki/Champion

  */
  // todo : añadir los getters para el resto de stats

  getStats() {
    return this.stats;
  }
  getItems() {
    return this.items;
  }

  getBaseDamage() {
    totalDamage = this.getStats().dam_base + (this.getLvl() - 1) * this.getStats().dam_lvl *  (0.7025 + 0.0175*(this.getLvl()-1)) ;  
    return totalDamage;
  }
  
  getExtraDamage() {
    totalDamage = 0;
    for (let i = 0; i < this.getItems().length; i++) {
      totalDamage += this.getItems()[i].getDamage();
    }
    return totalDamage;
  }

  getTotalDamage() {
    // todo : añadir algunas interacciones entre los items

    return this.getBaseDamage() + this.getExtraDamage();
  }
  // añade los getters para el resto de stats

  getBaseArmor() {
    totalArmor = this.getStats().arm_base + (this.getLvl() - 1) * this.getStats().arm_lvl *  (0.7025 + 0.0175*(this.getLvl()-1));  
    return totalArmor;
  }
  getExtraArmor() {
    totalArmor = 0;
    for (let i = 0; i < this.getItems().length; i++) {
      totalArmor += this.getItems()[i].getArmor();
    }
    return totalArmor;
  }
  getTotalArmor() {
    // todo : añadir algunas interacciones entre los items
    return this.getBaseArmor() + this.getExtraArmor();
  }
  getBaseHealth() {
    totalHealth = this.getStats().hp_base + (this.getLvl() - 1) * this.getStats().hp_lvl *  (0.7025 + 0.0175*(this.getLvl()-1));  
    return totalHealth;
  }
  getExtraHealth() {
    totalHealth = 0;
    for (let i = 0; i < this.getItems().length; i++) {
      totalHealth += this.getItems()[i].getHealth();
    }
    return totalHealth;
  }
  getTotalHealth() {
    // todo : añadir algunas interacciones entre los items
    return this.getBaseHealth() + this.getExtraHealth();
  }
  getBaseMagicResist() {
    totalMagicResist = this.getStats().mr_base + (this.getLvl() - 1) * this.getStats().mr_lvl *  (0.7025 + 0.0175*(this.getLvl()-1)) ;  
    return totalMagicResist;
  }
  getExtraMagicResist() {
    totalMagicResist = 0;
    for (let i = 0; i < this.getItems().length; i++) {
      totalMagicResist += this.getItems()[i].getMagicResist();
    }
    return totalMagicResist;
  }
  getTotalMagicResist() {
    // todo : añadir algunas interacciones entre los items
    return this.getBaseMagicResist() + this.getExtraMagicResist();
  }
  getBaseHealthRegen() {
    totalHealthRegen = this.getStats().hp5_base + (this.getLvl() - 1) * this.getStats().hp5_lvl  *  (0.7025 + 0.0175*(this.getLvl()-1));  
    return totalHealthRegen;
  }
  getExtraHealthRegen() {
    totalHealthRegen = 0;
    for (let i = 0; i < this.getItems().length; i++) {
      totalHealthRegen += this.getItems()[i].getHealthRegen();
    }
    return totalHealthRegen;
  }
  getTotalHealthRegen() {
    // todo : añadir algunas interacciones entre los items
    return this.getBaseHealthRegen() + this.getExtraHealthRegen();
  }
  
  getLvl() {
    return this.lvl;
  }

  /* 
    Como funciona el attack speed
    totalAttackSpeed = baseAttackSpeed + (bonusAttackSpeed + growthAttackSpeed * (lvl - 1) * (0.7025+0.0175*(lvl-1) ) ) * AttackSpeedRatio

    context: https://leagueoflegends.fandom.com/wiki/Champion_statistic
  */

  getBaseAttackSpeed() {
    totalAttackSpeed = this.getStats().as_base;  
    return totalAttackSpeed;
  }

  getBonusAttackSpeed() {
    // todo : añadir algunas interacciones entre los items
    // todo : añadir interacciones con las habilidades

    totalAttackSpeed = 0;
    for (let i = 0; i < this.getItems().length; i++) {
      totalAttackSpeed += this.getItems()[i].getAttackSpeed();
    }
    return totalAttackSpeed;
  } 

  getBonusAttackSpeed() {
    // todo : añadir algunas interacciones entre los items
    // todo : añadir interacciones con las habilidades

    totalAttackSpeed = 0;
    for (let i = 0; i < this.getItems().length; i++) {
      totalAttackSpeed += this.getItems()[i].getAttackSpeed();
    }
    return totalAttackSpeed;
  
  }

  getTotalAttackSpeed() {
    return this.getBaseAttackSpeed() + (this.getBonusAttackSpeed() + this.getStats().as_lvl * (this.getLvl() - 1) * (0.7025 + 0.0175*(this.getLvl()-1)) ) * this.getStats().as_ratio;
  }


}