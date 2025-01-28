CREATE MIGRATION m125ajrbqp7ov36s7aniefxc376ofxdlketzspy4yddd3hrh4lxmla
    ONTO initial
{
  CREATE TYPE default::Deck {
      CREATE PROPERTY description: std::str;
      CREATE REQUIRED PROPERTY name: std::str;
  };
  CREATE TYPE default::Card {
      CREATE REQUIRED LINK deck: default::Deck {
          CREATE PROPERTY order: std::int32;
      };
      CREATE REQUIRED PROPERTY back: std::str;
      CREATE REQUIRED PROPERTY front: std::str;
  };
};
