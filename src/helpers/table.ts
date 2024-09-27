import SortHelper from './sort';

type TableRow = {[K: string]: number | string | undefined | null};

export type TableData = TableRow[];

const tables = document.querySelectorAll('table');

const init = () => {
  tables.forEach(async(table) => {
    const tableBody = table.querySelector('tbody');
    const url = table.getAttribute('data-url');
    let tableData: TableData;
    const checkboxWrap = table.querySelector('.th-checkbox');
    const checkboxComponent = checkboxWrap?.children[0];
    const columnsAttr = table.getAttribute('data-columns');
    const columns = columnsAttr ? JSON.parse(columnsAttr) : [];
    const labelsAttr = table.getAttribute('data-labels');
    const labels = labelsAttr && JSON.parse(labelsAttr);
    const actionsAttr = table.getAttribute('data-actions');
    const actions = actionsAttr && JSON.parse(actionsAttr);

    let activeSortIndex;

    const sortedColumns = table.querySelectorAll('.arrow-icon');

    if (url) {
        const response = await fetch(url);
        const data = await response.json();
        tableData = data;
    } else {
        const data = table.getAttribute('data-tableData');
        tableData = data && JSON.parse(data);
    }

    sortedColumns.forEach((sortedElem, i) => {
        if (i === 0) {
        sortedElem.classList.add('text-grey-800');
        } else {
        sortedElem.classList.add('text-grey-200');
        }

        const activeElem = (sortedElem as HTMLElement).dataset.name;
        activeSortIndex = columns.findIndex((column: TableRow) => column.name === activeElem);

        if (tableData && activeElem) {
        tableData = SortHelper.sortArrByParam(tableData, activeElem, 'asc');
        }
    });
    
  const drawTableBody = () => {
    if (tableBody) {
      tableBody.innerHTML = '';
    } 
    
    if (tableData) {
      tableData.map((row, index: number) => {
        const tr = document.createElement('tr');
        tr.classList.add('flex', 'justify-between', 'items-center', 'border-b', 'border-gray-200', 'last:border-b-0', 'hover:bg-grey-50');
  
        
        if (checkboxComponent) {
          const td = document.createElement('td');
          td.classList.add('p-4', 'flex');
          td.appendChild(checkboxComponent.cloneNode(true));

          tr.appendChild(td);
        }

        columns.forEach(({ name }: { name: string }) => {
          const td = document.createElement('td');
          td.classList.add('p-4', 'flex', 'w-full', 'color-grey-800');
          if (name === 'label' && labels) {
            const labelData = labels[index];

            const label = document.createElement('div');

            label.classList.add(
              'flex', 
              'items-center', 
              `bg-${labelData.bgColor}`, 
              `text-${labelData.color}`, 
              'border', 
              `border-${labelData.borderColor ? labelData.borderColor : labelData.bgColor}`, 
              'px-2', 
              'py-1.25', 
              'text-xs', 
              'font-semibold', 
              'rounded'
            );

            const marker = document.createElement('div');
            marker.classList.add('w-1.5', 'h-1.5', 'mr-1', 'rounded', `bg-${labelData.color}`);
            label.appendChild(marker);
            const text = document.createElement('div');
            text.textContent = labelData.text;

            label.appendChild(text);
            td.appendChild(label);

          } else if (name === 'actions') {
            const actionsWrap = document.createElement('div');
            actionsWrap.classList.add('flex', 'gap-2');
            if (actions) {
              actions.forEach(({ icon, color }: { icon: string, color: string }) => {
                const button = document.createElement('button');
                button.classList.add('flex', 'items-center', 'gap-1', 'pr-2', 'text-base', 'font-semibold');
                const i = document.createElement('i');
                i.classList.add(`bi`, `bi-${icon}`, `text-${color}`);
                button.appendChild(i);
                actionsWrap.appendChild(button);
              });
            }
            td.appendChild(actionsWrap);
          } else if (name) {
            const div = document.createElement('div');
            div.textContent = String(row[name]) || '';
            td.appendChild(div);
          }
          tr.appendChild(td);
        });
        tableBody?.appendChild(tr);
      });
    }
  };

  drawTableBody();

  const arrows = table.querySelectorAll('.arrow-icon');
  arrows.forEach((arrow) => {
      arrow.addEventListener('click', () => {
        const activeElem = (arrow as HTMLElement).dataset.name;
        const prevActiveElem = arrow.classList.contains('text-grey-800');
        let direction: 'asc' | 'desc' = 'asc';

        if (prevActiveElem) {
          arrow.classList.toggle('rotate-180');
          direction = arrow.classList.contains('rotate-180') ? 'desc' : 'asc';
        } else {
          arrows.forEach((arr) => {
            if (arr.classList.contains('text-grey-800')) {
              arr.classList.replace('text-grey-800', 'text-grey-200');
            }
          });
          activeSortIndex = columns.findIndex((column: TableRow) => column.name === activeElem);
          arrow.classList.replace('text-grey-200', 'text-grey-800');
          direction = 'asc';
        }

        if (tableData && activeElem) {
          tableData = SortHelper.sortArrByParam(tableData, activeElem, direction);
          drawTableBody();
        }
      });
    });
  });
};

  export default { init };