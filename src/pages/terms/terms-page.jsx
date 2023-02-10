import React from 'react';
import './terms-page.scss';

import { Container } from '../../components/container/container';
import { Menu } from '../../components/menu/menu';

export function TermsPage({bookGenres}) {
  return (
    <div className='terms'>
      <Container className='container--terms'>
        <Menu bookGenres={bookGenres} current='terms' />
        <div className='rules'>
          <h2 className="rules-title">Правила пользования</h2>
          <ol className="rules-list rules-list-main">
            <li className='list-text--main'>
              1. Идейные соображения высшего порядка, а также высокое качество позиционных исследований представляет 
              собой интересный эксперимент проверки экспериментов, поражающих по своей масштабности и грандиозности.
              <ol className='rules-list rules-list--sub'>
                <li className='list-text--sub'>
                  1.1. Задача организации, в особенности же социально-экономическое развитие однозначно определяет каждого участника 
                  как способного принимать собственные решения касаемо инновационных методов управления процессами. 
                </li>
                <li className='list-text--sub'>
                  1.2. Не следует, однако, забывать, что разбавленное изрядной долей эмпатии, рациональное мышление играет важную роль в формировании приоритизации разума над эмоциями. 
                  Но некоторые особенности внутренней политики лишь добавляют фракционных разногласий и преданы социально-демократической анафеме. 
                </li>
                <li className='list-text--sub'>
                  1.3. Приятно, граждане, наблюдать, как элементы политического процесса, превозмогая сложившуюся непростую экономическую ситуацию, 
                  объявлены нарушающими общечеловеческие нормы этики и морали.  
                </li>
                <li className='list-text--sub'>
                  1.4. Но независимые государства, которые представляют собой яркий пример континентально-европейского типа политической культуры,
                  будут объединены в целые кластеры себе подобных.  
                </li>
              </ol>
            </li>
            <li className='list-text--main'>
              2. С учётом сложившейся международной обстановки, консультация с широким активом предоставляет широкие возможности для приоритизации разума над эмоциями.
              <ol className='rules-list rules-list--sub'>
                <li className='list-text--sub'>
                  2.1. Задача организации, в особенности же социально-экономическое развитие однозначно определяет каждого 
                  участника как способного принимать собственные решения касаемо инновационных методов управления процессами.
                  <ol className='rules-list rules-list--sub'>
                    <li className='list-text--sub'>
                      2.1.1. Не следует, однако, забывать, что разбавленное изрядной долей эмпатии, рациональное мышление играет важную роль в формировании приоритизации разума над эмоциями. 
                      Но некоторые особенности внутренней политики лишь добавляют фракционных разногласий и преданы социально-демократической анафеме. 
                    </li>
                    <li className='list-text--sub'>
                      2.1.2. Приятно, граждане, наблюдать, как элементы политического процесса, превозмогая сложившуюся непростую экономическую ситуацию, объявлены нарушающими общечеловеческие нормы этики и морали. 
                    </li>
                  </ol>
                </li>
                <li className='list-text--sub'>
                  2.2. Но независимые государства, которые представляют собой яркий пример континентально-европейского типа 
                  политической культуры, будут объединены в целые кластеры себе подобных. 
                </li>      
              </ol>
            </li>
            <li className="list-text--main">
              3. Принимая во внимание показатели успешности, укрепление и развитие внутренней структуры требует от нас анализа приоритизации разума над эмоциями.
              <ol className="rules-list rules-list--sub">
                <li className="list-text--sub">
                  3.1. Задача организации, в особенности же социально-экономическое развитие однозначно определяет каждого участника как способного принимать собственные решения касаемо инновационных методов управления процессами.
                  <ol className="rules-list rules-list--sub">
                    <li className='list-text--sub'>
                      3.1.1. Не следует, однако, забывать, что разбавленное изрядной долей эмпатии, рациональное мышление играет важную роль в формировании приоритизации разума над эмоциями. 
                      Но некоторые особенности внутренней политики лишь добавляют фракционных разногласий и преданы социально-демократической анафеме. 
                    </li>
                    <li className='list-text--sub'>
                      3.1.2. Приятно, граждане, наблюдать, как элементы политического процесса, превозмогая сложившуюся непростую экономическую ситуацию, объявлены нарушающими общечеловеческие нормы этики и морали.
                    </li>
                  </ol>
                </li>
                <li className="list-text--sub">
                  3.2. Но независимые государства, которые представляют собой яркий пример континентально-европейского типа политической культуры, будут объединены в целые кластеры себе подобных. 
                </li>
                <li className="list-text--sub">
                  3.3. Не следует, однако, забывать, что экономическая повестка сегодняшнего дня требует анализа анализа существующих паттернов поведения.
                  <ol className="rules-list rules-list--sub">
                    <li className='list-text--sub'>
                      3.3.1. А ещё представители современных социальных резервов набирают популярность среди определенных слоев населения, а значит, должны быть функционально разнесены на независимые элементы.
                      <ol className="rules-list rules-list--sub">
                        <li className='list-text--sub'>
                          3.3.1.1. Стремящиеся вытеснить традиционное производство, нанотехнологии могут быть объявлены нарушающими общечеловеческие нормы этики и морали. 
                        </li>
                        <li className='list-text--sub'>
                          3.3.1.2. Прежде всего, разбавленное изрядной долей эмпатии, рациональное мышление однозначно фиксирует необходимость новых предложений. 
                          Являясь всего лишь частью общей картины, независимые государства представлены в исключительно положительном свете.
                        </li>  
                      </ol>  
                    </li>
                  </ol>
                </li>
                <li className="list-text--sub">
                  3.4. Повседневная практика показывает, что убеждённость некоторых оппонентов требует от нас анализа распределения внутренних резервов и ресурсов.
                </li>
              </ol>
            </li>
          </ol>
        </div>
      </Container>
    </div>
  )
}
