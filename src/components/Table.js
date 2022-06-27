import React from "react";
import "./table.scss";

function Table() {
  return (
    <div class="container">
      <ul class="responsive-table">
        <li class="table-header">
          <div class="col col-2">User Name</div>
          <div class="col col-3">Email</div>
          <div class="col col-4">Action</div>
        </li>
        <li class="table-row">
          <div class="col col-1" data-label="Job Id">
            42235
          </div>
          <div class="col col-2" data-label="Customer Name">
            John Doe
          </div>
          <div class="col col-3" data-label="Amount">
            $350
          </div>
          <div class="col col-4" data-label="Payment Status">
            Pending
          </div>
        </li>
        <li class="table-row">
          <div class="col col-1" data-label="Job Id">
            42442
          </div>
          <div class="col col-2" data-label="Customer Name">
            Jennifer Smith
          </div>
          <div class="col col-3" data-label="Amount">
            $220
          </div>
          <div class="col col-4" data-label="Payment Status">
            Pending
          </div>
        </li>
        <li class="table-row">
          <div class="col col-1" data-label="Job Id">
            42257
          </div>
          <div class="col col-2" data-label="Customer Name">
            John Smith
          </div>
          <div class="col col-3" data-label="Amount">
            $341
          </div>
          <div class="col col-4" data-label="Payment Status">
            Pending
          </div>
        </li>
        <li class="table-row">
          <div class="col col-1" data-label="Job Id">
            42311
          </div>
          <div class="col col-2" data-label="Customer Name">
            John Carpenter
          </div>
          <div class="col col-3" data-label="Amount">
            $115
          </div>
          <div class="col col-4" data-label="Payment Status">
            Pending
          </div>
        </li>
      </ul>
    </div>
  );
}

export default Table;
