import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
// components
import Header from '../../libs/ui/Header/Header';
import ViewItemRow from '../ViewItemRow/ViewItemRow';

// styled components
import styled from 'styled-components/macro';

const Wrapper = styled.div`
  width: 100%;
  margin-top: 2rem;
`;

const ViewContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 2rem;
`;

const View = styled.div`
  border: 1px solid black;
  padding: 1rem 2rem;
`;

const DayView = ({ day, plan, username }) => {
  const [food, updateFood] = useState([]);
  const [exercise, updateExercise] = useState([]);
  const [dayHeader, updateDayHeader] = useState('');
  const [dayText, updateDayText] = useState('');
  useEffect(() => {
    const date = moment(day);
    updateDayHeader(date.clone().format('ddd, MMM Do, YYYY'))
    updateDayText(date.clone().format('YYYYMMDD'));
    const foodForDate = [];
    const exerciseForDate = [];
    plan
      .filter(item => moment(item.date).isSame(date))
      .forEach(data => {
        if (data.type === 'food') foodForDate.push(data);
        else if (data.type === 'exercise') exerciseForDate.push(data);
      });
    if (foodForDate.length) updateFood(foodForDate);
    if (exerciseForDate) updateExercise(exerciseForDate);
  }, [day, plan]);
  const togglePlanItemComplete = (username, id, done) => {
    return fetch(`/api/users/${username}/item/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        item: { done },
      }),
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(res => {
        if (res.status !== 200) return Promise.reject({ status: res.status, msg: `error toggling item ${id} to ${done}` });
        return res.json();
      })
      .then(res => ({ ...res, status: 200 }))
      .catch(err => err);
  };
  const foodUpdated = async (updatedId, isDone) => {
    const successfulToggle = await togglePlanItemComplete(username, updatedId, isDone);
    if (successfulToggle.status === 200) {
      const updatedFood = food.map(meal => (
        meal.id === updatedId
          ? Object.assign({}, meal, { done: isDone })
          : Object.assign({}, meal)
      ));
      updateFood(updatedFood);
    }
  };
  const exerciseUpdated = async (updatedId, isDone) => {
    const successfulToggle = await togglePlanItemComplete(username, updatedId, isDone);
    if (successfulToggle.status === 200) {
      const updatedExercise = exercise.map(ex => (
        ex.id === updatedId
          ? Object.assign({}, ex, { done: isDone })
          : Object.assign({}, ex)
      ));
      updateExercise(updatedExercise);
    }
  };
  const FoodItems = food.map((meal, i) => (
    <ViewItemRow
      key={meal.id}
      rowType="food"
      day={dayText}
      data={{
        id: meal.id,
        category: meal.category,
        items: meal.items.join(', '),
        name: `food_${meal.category}_${meal.id}`,
        done: meal.done,
        checkChange: foodUpdated,
      }}
      isFirst={i === 0}
    />
  ));
  const ExerciseItems = exercise.map((ex, i) => (
    <ViewItemRow
      key={ex.id}
      rowType="food"
      day={dayText}
      data={{
        id: ex.id,
        category: ex.category,
        items: ex.item,
        name: `food_${ex.category}_${ex.id}`,
        done: ex.done,
        checkChange: exerciseUpdated,
      }}
      isFirst={i === 0}
    />
  ));
  return (
    <Wrapper>
      <Header size="h2" center>
        {dayHeader}
      </Header>
      <ViewContainer>
        <View>
          <Header size="h3" center removeMarginTop>Food</Header>
          {FoodItems}
        </View>
        <View>
          <Header size="h3" center removeMarginTop>Exercise</Header>
          {ExerciseItems}
        </View>
      </ViewContainer>
    </Wrapper>
  );
};

DayView.propTypes = {
  username: PropTypes.string.isRequired,
  day: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
  ]).isRequired,
  plan: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.any.isRequired,
      type: PropTypes.oneOf([
        'food', 'exercise',
      ]).isRequired,
      category: PropTypes.string.isRequired,
      done: PropTypes.bool.isRequired,
      item: PropTypes.string,
      items: PropTypes.arrayOf(PropTypes.string),
      notes: PropTypes.string,
    })
  ).isRequired,
};

export default DayView;
