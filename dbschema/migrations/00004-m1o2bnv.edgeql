CREATE MIGRATION m1o2bnv2lre265i6bjmct5plu3jrtdnfmfwbg3ppphl3wwq4kase7q
    ONTO m1xeajs7yjfabwo2yv7din4ernpyq7waslopqcrldy3tkt6nbil7da
{
  ALTER TYPE default::Card {
      ALTER LINK deck {
          DROP PROPERTY order;
      };
  };
};
