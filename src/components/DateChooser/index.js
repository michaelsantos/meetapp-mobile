import React, { useState, useMemo } from 'react';
import { format, addDays, startOfDay } from 'date-fns';
import pt from 'date-fns/locale/pt';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, GoBackButton, GoNextButton, DateText } from './styles';

export default function DateChooser({ onChange }) {
  const [date, setDate] = useState(new Date());
  const [formattedDate, setFormattedDate] = useState('');

  useMemo(() => {
    setFormattedDate(format(date, "dd 'de' MMMM", { locale: pt }));
  }, [date]);

  function handleSetDate(day) {
    const newDate = startOfDay(addDays(date, day));

    setDate(newDate);
    onChange(newDate);
  }

  return (
    <Container>
      <GoBackButton onPress={() => handleSetDate(-1)}>
        <Icon name="chevron-left" size={30} color="#fff" />
      </GoBackButton>
      <DateText>{formattedDate}</DateText>
      <GoNextButton onPress={() => handleSetDate(1)}>
        <Icon name="chevron-right" size={30} color="#fff" />
      </GoNextButton>
    </Container>
  );
}

DateChooser.propTypes = {
  onChange: PropTypes.func.isRequired,
};
