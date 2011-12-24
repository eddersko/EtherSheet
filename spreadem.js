/* Spreadem.js - Main controller for spreadem a collaborative spreasheet */
/* Authored by: Cooper Quintin <cooperq@cooperq.com> (@cooperq) */

var spreadem = {
  sheet_values : {},
  row_size: 0,
  col_size: 0,
  table_selector: '#sheet1',
  initialize : function(){
    $('#sheet-container').append($('<table id="sheet1" class="spreadem">'));
  },
  redraw_table: function(){
    $(this.table_selector).html('');
    $(this.table_selector).html(this.sheet_to_table());
  },
  sheet_to_table : function(){
    html = '';
    for(i=0; i < this.row_size; i++){
      //draw row
      html += '<tr id="row-' + i + '">';
      //draw empty column in each row
      for(j=0; j < this.col_size; j++){
        html += '<td id="cell-' + i + '-' + j + '" ><div row='+i+' col='+j+' contenteditable=true></div></td>';
      }
      html += '</tr>';
    }
    $(this.table_selector).append(html);
    //loop through each element in the data
    for(var r in this.sheet_values){
      var row = this.sheet_values[r];
      for(var i in row){ 
      //fill in the cell
        var cell = $('#cell-'+r+'-'+ i + ' div');
        cell.attr('id', row[i].guid);
        cell.append(row[i].val);
      }
    }

    $(this.table_selector +' td div').blur(function(){
      if($(this).html() !=''){
        spreadem.add_value($(this).attr('row'), $(this).attr('col'), $(this).html());
      }
    });
  },
  add_value: function(row, column, value){
    console.log('adding values ' + row + ' ' + column + ' ' + value);
    row = parseInt(row);
    column = parseInt(column);
    if(this.sheet_values[row] === undefined){
      this.sheet_values[row] = {}
    }
    this.sheet_values[row][column] = {guid: 'TODO', val: value}
    if(column+1 >= this.col_size){
      this.col_size = column+2;
    }
    if(row+1 >= this.row_size){
      this.row_size = row+2;
    }
    this.redraw_table();
  }
};

//when row is clicked make contents editable
//when editing is done
//update values
//redraw
