import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './app.css';
import { fetchHisTimetable, fetchMealServiceDietInfo, fetchSchoolSchedule, fixedComponents } from './lib/neis';
import Container from './components/container';
import Box from './components/box';
import MealField from './components/meal';
import reportWebVitals from './reportWebVitals';
import _404 from './components/404';
import Schedule from './components/schedule';
import Options from './components/options';
import Graph from './components/graph';
import OriginalCalendar from './components/calendar';
import { dateString, YYYYMMDD } from './lib/datetime';
import Footer from './components/footer';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

export default function App(): JSX.Element {
  const [componentMeal, setComponentMeal] = useState<object[]>([]);
  const [componentTimetable, setComponentTimetable] = useState<object[]>([]);
  const [componentSchedule, setComponentSchedule] = useState<object[]>([]);
  const [grade, setGrade] = useState<string>('1');
  const [cclass, setCclass] = useState<string>('1'); // 기존에 있는 class 때문에 앞에 c를 하나 더 붙임

  const changeTimetable = (type: string, value: string) => {
    var __grade = grade;
    var __class = cclass;

    if (type == 'grade') {
      setGrade(value);
      __grade = value;
    } else if (type == 'class') {
      setCclass(value);
      __class = value;
    }

    localStorage.setItem('show_grade', __grade);
    localStorage.setItem('show_class', __class);

    async function asyncUpdate() {
      setComponentTimetable(await fetchHisTimetable(__grade, __class));
    }
    asyncUpdate();
  }
  useEffect(() => {
    var s_grade = localStorage.getItem('show_grade');
    s_grade = (s_grade) ? s_grade : '1';

    var s_class = localStorage.getItem('show_class');
    s_class = (s_class) ? s_class : '1';

    setGrade(s_grade);
    setCclass(s_class);

    async function async() {
      setComponentMeal(await fetchMealServiceDietInfo());
      setComponentTimetable(await fetchHisTimetable(s_grade, s_class));
      setComponentSchedule(await fetchSchoolSchedule());
    }
    async();
  }, []);

  return (
    <>
      <div className="container relative mx-auto px-4 py-24 min-w-screen min-h-screen" id="app">
        <div className="flex flex-wrap justify-start items-start">
          <div className="w-full mx-2 mt-2 mb-5 text-xs sm:text-sm">
            <Box type="warning">
              <span>새학기 준비 기간인 관계로 2022년도 9월을 기준으로 데이터를 불러왔습니다.</span>
              <br />
              <span>학사일정만 최근 데이터로 불러오니 착오가 없으시길 바랍니다.</span>
            </Box>
          </div>
          <Container title="🍖 오늘의 급식" description={`${fixedComponents.mealServiceDietInfo.length <= 0 ? dateString(YYYYMMDD(new Date())) : dateString(fixedComponents.mealServiceDietInfo)
            }, 오늘은 어떤 급식이 나올까요? 상상만 해도 두근거리네요`}>
            {
              (!(componentMeal.length <= 0)) ? (
                componentMeal.map((args: any) => (
                  <MealField today={args.today} components={args.components} />
                ))
              ) : <_404 />
            }
          </Container>
          <Container title="🖊️ 시간표" description="이번주(월~금) 시간표를 불러옵니다. (아래의 옵션을 통해 다른 시간표를 확인할 수 있어요)">
            <Options onChange={changeTimetable} g={grade} s={cclass} />
            {
              (!(componentTimetable.length <= 0)) ? <Graph components={componentTimetable} /> : <_404 />
            }
          </Container>
          <Container title="📅 학사일정" description="이번 달로부터 3달 후의 일정까지 확인할 수 있어요!">
            {
              (!(componentSchedule.length <= 0)) ? <OriginalCalendar components={componentSchedule} /> : <_404 />
            }
          </Container>
          <Footer />
        </div>
      </div>
    </>
  )
}

root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
