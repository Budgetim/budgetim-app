import React, { FC, useEffect, useState } from 'react';

import { CategoryCard } from '../../../components/CategoryCard';
import { MicroChart } from '../../../charts/MicroChart';
import { TextVariant } from '../../../components/TextVariant';

import { Container } from './styled';
import { useUserState } from '../../../contexts/user';
import { useErrorHandler } from '../../../hooks/useErrorHandler';
import { getStatisticsByDays } from '../../../api/categories/getStatisticsByDays';
import { Loader } from '../../../components/Loader';
import { Modal } from './Modal';

export const ByCategories: FC = () => {
  const [visible, setVisible] = useState(false);
  const [activeCategoryId, setActiveCategoryId] = useState(null);
  const { token } = useUserState();
  const [data, setData] = useState<any[] | null>(null);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useErrorHandler(error);

  const getData = async () => {
    setLoading(true);
    try {
      const result = await getStatisticsByDays({ month: 11, year: 2021 }, token);
      setData(result);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    void getData();
  }, [])

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <TextVariant variant="subheadlineBold">{error}</TextVariant>;
  }

  if (!data) {
    return null;
  }

  const onClose = () => {
    setVisible(false);
  };

  return (
    <Container scrollIndicatorInsets={{ right: 1 }}>
      {data.map((item) => {
        return (
          <CategoryCard
            key={item.id}
            title={item.title}
            description={item.description}
            tagColor={item.color}
            chart={<MicroChart data={item.data} />}
            onPress={() => {
              setActiveCategoryId(item.id);
              setVisible(true);
            }}
          />
        );
      })}
      <Modal visible={visible} onClose={onClose} categoryId={activeCategoryId} />
    </Container>
  );
}