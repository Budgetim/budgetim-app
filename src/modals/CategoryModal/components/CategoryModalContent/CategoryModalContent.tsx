import React, { FC, useEffect, useState } from 'react';
import { ScrollView, TouchableHighlight } from 'react-native';
import i18n from 'i18n-js';

import { Input } from '../../../../components/Input';

import { Content, Section } from './styled';
import { CategoryModalContentProps } from './types';
import { colors } from '../../../../constants/colors';
import { ColorPicker } from './ColorPicker';

export const CategoryModalContent: FC<CategoryModalContentProps> = props => {
  const { title, setTitle, description, setDescription, color, setColor } = props;

  const [titleError, setTitleError] = useState(false);

  useEffect(() => {
    setTitleError(false);
  }, [title]);

  return (
    <ScrollView>
      <TouchableHighlight>
        <Content>
          <Section error={titleError}>
            <Input
              variant="subheadlineRegular"
              defaultValue={title}
              onChangeText={setTitle}
              placeholder={i18n.t('categories.form.name')}
            />
          </Section>
          <Section>
            <Input
              variant="subheadlineRegular"
              defaultValue={description || ''}
              onChangeText={setDescription}
              placeholder={i18n.t('categories.form.description')}
            />
          </Section>
          <Section>
            <ColorPicker onChange={color => setColor(color)} value={color} colors={colors} />
          </Section>
        </Content>
      </TouchableHighlight>
    </ScrollView>
  );
};
