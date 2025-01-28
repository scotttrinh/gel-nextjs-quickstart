CREATE MIGRATION m1wvmr2ph7loivjknt2swyvtnstlf6wpf3vlioihtjp27obrvffb3a
    ONTO m1o2bnv2lre265i6bjmct5plu3jrtdnfmfwbg3ppphl3wwq4kase7q
{
  ALTER TYPE default::Card {
      ALTER PROPERTY order {
          CREATE CONSTRAINT std::exclusive;
      };
  };
};
