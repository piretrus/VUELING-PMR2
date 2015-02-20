

VUELING.Class.My25SidebarAddBono = function () {
    var parent = SKYSALES.Class.SkySales(),
        thisMy25SidebarAddBono = SKYSALES.Util.extendObject(parent);

    thisMy25SidebarAddBono.labelNotRows = null;
    thisMy25SidebarAddBono.ControlId_ShopRows = null;
    thisMy25SidebarAddBono.ControlId_RowsClick = null;
    thisMy25SidebarAddBono.ControlId_TotalPrice = null;
    thisMy25SidebarAddBono.BonoTypes = null;
    thisMy25SidebarAddBono.Rows = [];

    thisMy25SidebarAddBono.init = function (json) {
        this.setSettingsByObject(json);
        this.initObjects();
        this.addEvents();
    };

    thisMy25SidebarAddBono.initObjects = function () {
        thisMy25SidebarAddBono.ShowAllBonos();
    };

    thisMy25SidebarAddBono.addEvents = function () {

    };

    thisMy25SidebarAddBono.RowClick = function (e) {
        //var idBono = $(e.currentTarget).val();
        var idBono = $(thisMy25SidebarAddBono.ControlId_RowsClick, e.currentTarget).val();
        var idPassenger = $(e.currentTarget).data("beneficiary");
        thisMy25SidebarAddBono.AddRow(idBono, idPassenger);
        thisMy25SidebarAddBono.ShowAllBonos();
    };

    thisMy25SidebarAddBono.AddRow = function (idBono, idPassenger) {
        var pos = undefined;
        for (var i in thisMy25SidebarAddBono.Rows)
            if (thisMy25SidebarAddBono.Rows[i].IdPassenger == idPassenger) {
                pos = i;
                break;
            }
        var item = {
            IdBono: idBono,
            IdPassenger: idPassenger,
        };
        if (pos != undefined)
            thisMy25SidebarAddBono.Rows.splice(pos, 1);
        thisMy25SidebarAddBono.Rows.push(item);
    };
    thisMy25SidebarAddBono.RowBonoCount = function (idBono) {
        var count = 0;
        for (var i in thisMy25SidebarAddBono.Rows)
            if (thisMy25SidebarAddBono.Rows[i].IdBono == idBono)
                count++;
        return count;
    };
    thisMy25SidebarAddBono.ShowAllBonos = function () {
        thisMy25SidebarAddBono.Rows = [];
        $(thisMy25SidebarAddBono.ControlId_RowsClick + ":checked").each(function (h, item) {
            var idBono = $(item).val();
            var idPassenger = $(item).data("beneficiary");
            thisMy25SidebarAddBono.AddRow(idBono, idPassenger);
        });
        var sb = '';
        var total = 0;

        for (var h in thisMy25SidebarAddBono.BonoTypes) {
            var idBono = thisMy25SidebarAddBono.BonoTypes[h].Typology;
            var count = thisMy25SidebarAddBono.RowBonoCount(idBono);
            if (count > 0) {
                var name = thisMy25SidebarAddBono.BonoTypes[h].Name;
                var price = parseFloat(thisMy25SidebarAddBono.BonoTypes[h].Amount.replace(",", "."));
                sb += '<tr id="SidebarRow' + idBono + '">';
                sb += '  <td class="col1" colspan="2" style="display: table-cell;">';
                sb += count + " " + name;
                sb += '  </td>';
                sb += '  <td class="col3 price7" style="display: table-cell;">';
                sb += SKYSALES.Util.convertToLocaleCurrency((count * price).toFixed(2));
                sb += '  </td>';
                sb += '</tr>';
                total += parseFloat((count * price).toFixed(2));
            }
        }
        if (sb == "") {
            sb += '<tr>';
            sb += '  <td colspan="2" style="padding-bottom:40px;">' + thisMy25SidebarAddBono.labelNotRows + '</td>';
            sb += '</tr>';
        }
        $(thisMy25SidebarAddBono.ControlId_TotalPrice).html(SKYSALES.Util.convertToLocaleCurrency(total.toFixed(2)));
        $(thisMy25SidebarAddBono.ControlId_ShopRows).html(sb);
    };

    return thisMy25SidebarAddBono;
};