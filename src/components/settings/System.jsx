import React, { useEffect, useState } from 'react'
import { Button, Label, Spinner } from 'reactstrap'
import { systemSchemaValidation } from '../../validations/SystemValidation';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import CurrencyList from 'currency-list'
import { useDispatch, useSelector } from 'react-redux';
import { clearMsg, saveSystem } from '../../features/SystemSlice';
import { toast } from 'react-toastify';

function System() {
  const {status, msg, systemData, logoData} = useSelector((state) => state.system);

  const [brand, setBrand] = useState("");
  const [vat, setVat] = useState("0");
  const [logo, setLogo] = useState("");
  const [currency, setCurrency] = useState("");
  const [receiptMsg, setReceiptMsg] = useState("");

  const dispatch = useDispatch();

  const {register, handleSubmit, formState: {errors}, reset} = useForm({
    resolver: yupResolver(systemSchemaValidation),
  })

  const onSubmit = () => {
    const systemData = new FormData();
    systemData.append('brand', brand);
    systemData.append('vat', vat);
    systemData.append('currency', currency);
    systemData.append('receiptMsg', receiptMsg);
    if (logo && logo instanceof File) {
      const extension = logo.name.split('.').pop();
      const modifiedLogo = new File([logo], `Logo.${extension}`, {
        type: logo.type,
        lastModified: logo.lastModified,
      });
      systemData.append('logo', modifiedLogo);
    }
    dispatch(saveSystem(systemData))
  };

  useEffect(() => {
    if (status === "success") toast.success(msg);
    if (status === "rejected") toast.error(msg);
    dispatch(clearMsg());
  }, [status]);

  useEffect(() => {
    setBrand(systemData.brand);
    setVat(systemData.vat);
    setLogo(logoData);
    setCurrency(systemData.currency);
    setReceiptMsg(systemData.receiptMsg);
    reset({
      brand: systemData.brand,
      vat: systemData.vat,
      currency: systemData.currency,
      receiptMsg: systemData.receiptMsg
    });
  }, []);

  return (
    <form className='content' onSubmit={handleSubmit(onSubmit)}>
      <div className="content-display system-wrap">
        <div className='system'>
          <section>
            <Label htmlFor='brand'>Brand</Label>
            <input
              id='brand'
              type='text'
              placeholder='Enter Brand'
              value={brand}
              className={'form-control' + (errors.brand ? ' is-invalid' : '')}
              {...register("brand", {onChange: (e) => setBrand(e.target.value)})}
              readOnly={status === "pendingSaveSystem"}
            />
            <p className='error'>{errors.brand?.message}</p>

            <Label htmlFor='logo'>Logo</Label>
            <input
              id='logo'
              type='file'
              className={'form-control' + (errors.logo ? ' is-invalid' : '')}
              {...register("logo", {onChange: (e) => setLogo(e.target.files[0])})}
              readOnly={status === "pendingSaveSystem"}
            />
            <p className='error'>{errors.logo?.message}</p>

            <img className='logo' src={logo instanceof File ? URL.createObjectURL(logo) : logo} alt="logo" />
          </section>

          <section>
            <Label htmlFor='brand'>VAT%</Label>
            <input
              id='vat'
              type='text'
              placeholder='Enter Vat %'
              value={vat}
              className={'form-control' + (errors.vat ? ' is-invalid' : '')}
              {...register("vat", {onChange: (e) => setVat(e.target.value)})}
              readOnly={status === "pendingSaveSystem"}
            />
            <p className='error'>{errors.vat?.message}</p>

            <Label htmlFor='currency'>Currency</Label>
            <select
              id="currency"
              value={currency}
              className={'form-select' + (errors.currency ? ' is-invalid' : '')}
              {...register("currency", {onChange: (e) => setCurrency(e.target.value)})}
              readOnly={status === "pendingSaveSystem"}
            >
              <option value="">Choose</option>
              {
                Object.values(CurrencyList.getAll("en_US")).sort().map((c) => (
                  <option key={c.code} value={c.code}>{c.code} ({c.symbol_native})</option>
                ))
              }
            </select>
            <p className='error'>{errors.currency?.message}</p>

            <Label htmlFor='receiptMsg'>Receipt Message</Label>
            <textarea
              style={{resize: "none"}}
              rows={5}
              id='receiptMsg'
              placeholder='Enter Message'
              value={receiptMsg}
              className={'form-control' + (errors.receiptMsg ? ' is-invalid' : '')}
              {...register("receiptMsg", {onChange: (e) => setReceiptMsg(e.target.value)})}
              readOnly={status === "pendingSaveSystem"}></textarea>
            <p className='error'>{errors.receiptMsg?.message}</p>
          </section>
        </div>
        <Button color='primary' type='submit' disabled={status === "pendingSaveSystem"}>
          {(status === "pendingSaveSystem") && <Spinner size='sm' />} Save
        </Button>
      </div>
    </form>
  )
}

export default System